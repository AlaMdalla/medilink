package esprit.subscription.paypal;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import esprit.subscription.Entity.PaymentMapping;
import esprit.subscription.Entity.Subs;
import esprit.subscription.Service.SubsService;
import esprit.subscription.dao.PaymentMappingDao;
import esprit.subscription.dao.SubsDao;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class PaypalController {

    private final PaypalService paypalService;
    private final SubsDao subsRepository;
    private final SubsService subsService;
    private final PaymentMappingDao paymentMappingDao;

    @Value("${paypal.success.url:http://localhost:8081/payment/success}")
    private String successUrl;

    @Value("${paypal.cancel.url:http://localhost:8081/payment/cancel}")
    private String cancelUrl;

    @Value("${angular.success.url:http://localhost:4200/success}")
    private String angularSuccessUrl;

    @Value("${angular.error.url:http://localhost:4200/error}")
    private String angularErrorUrl;

    @PostMapping("/payment/create")
    public ResponseEntity<String> createPayment(@RequestBody PaymentRequest paymentRequest) {
        try {
            log.info("Creating payment for subid: {}", paymentRequest.getSubid());
            Subs newSubscription = subsRepository.findById(paymentRequest.getSubid())
                    .orElseThrow(() -> new IllegalArgumentException("Subscription not found"));
            log.info("Subscription found: {}", newSubscription);

            // Check for existing active subscriptions
            List<Subs> allSubscriptions = subsService.getAllSubs();
            Subs activeSubscription = allSubscriptions.stream()
                    .filter(sub -> sub.getStatus() != null && sub.getStatus().equals("success"))
                    .findFirst()
                    .orElse(null);

            if (activeSubscription != null && activeSubscription.getSubid() != newSubscription.getSubid()) {
                // There’s an active subscription; check if the new one is a higher tier
                if (!subsService.isHigherTier(newSubscription.getTypesub(), activeSubscription.getTypesub())) {
                    throw new IllegalArgumentException("You already have an active subscription. You can only upgrade to a higher tier.");
                }
                // Mark the existing subscription as canceled
                activeSubscription.setStatus("canceled");
                subsRepository.save(activeSubscription);
                log.info("Canceled existing subscription: subid={}", activeSubscription.getSubid());
            }

            // Determine the correct amount: use discount price if > 0, otherwise use actual price
            double amountToUse = newSubscription.getSubsDiscountedPrice() > 0
                    ? newSubscription.getSubsDiscountedPrice()
                    : newSubscription.getSubsActualPrice();

            if (amountToUse <= 0) {
                throw new IllegalArgumentException("Invalid subscription price: Price must be greater than zero.");
            }

            // Clear any existing mappings for this subid
            paymentMappingDao.findBySubid(paymentRequest.getSubid()).forEach(mapping -> {
                log.info("Deleting old mapping for subid: {}, paymentId: {}", mapping.getSubid(), mapping.getPaymentId());
                paymentMappingDao.delete(mapping);
            });

            // Validate typesub before creating payment
            if (newSubscription.getTypesub() == null) {
                throw new IllegalArgumentException("Subscription type is null");
            }

            Payment payment = paypalService.createPayment(
                    amountToUse,
                    paymentRequest.getCurrency(),
                    "paypal",
                    "sale",
                    paymentRequest.getDescription(),
                    cancelUrl,
                    successUrl,
                    paymentRequest.getSubid().toString()
            );
            log.info("PayPal payment created: {}", payment.getId());

            PaymentMapping mapping = new PaymentMapping();
            mapping.setPaymentId(payment.getId());
            mapping.setSubid(paymentRequest.getSubid());
            paymentMappingDao.save(mapping);
            log.info("Payment mapping saved: paymentId={}, subid={}", payment.getId(), paymentRequest.getSubid());

            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    newSubscription.setStatus("pending");
                    subsRepository.save(newSubscription);
                    log.info("Returning PayPal approval URL: {}", link.getHref());
                    return ResponseEntity.ok(link.getHref());
                }
            }
            throw new PayPalRESTException("No approval URL found in PayPal response");
        } catch (IllegalArgumentException e) {
            log.error("Invalid input: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } catch (PayPalRESTException e) {
            log.error("Payment creation failed: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Payment creation failed: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }

    @GetMapping("/payment/success")
    public RedirectView paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId
    ) {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                String custom = payment.getTransactions().get(0).getCustom();
                Integer subid = Integer.parseInt(custom);
                Subs subscription = subsRepository.findById(subid)
                        .orElseThrow(() -> new IllegalArgumentException("Subscription not found"));
                subscription.setStatus("success");
                if (subscription.getEndDate() == null) {
                    subscription.setEndDate(calculateEndDate(subscription.getTypesub()));
                }
                subsRepository.save(subscription);
                log.info("Payment successful for subid: {}, end date set to: {}", subid, subscription.getEndDate());
                return new RedirectView(angularSuccessUrl);
            }
            throw new PayPalRESTException("Payment not approved");
        } catch (PayPalRESTException e) {
            log.error("Payment execution failed: {}", e.getMessage());
            return new RedirectView(angularErrorUrl + "?reason=" + encode(e.getMessage()));
        } catch (IllegalArgumentException e) {
            log.error("Invalid subscription data: {}", e.getMessage());
            return new RedirectView(angularErrorUrl + "?reason=" + encode(e.getMessage()));
        }
    }

            // New endpoint to cancel a subscription
            @PostMapping("/subs/cancel/{subid}")
            public ResponseEntity<String> cancelSubscription(@PathVariable("subid") Integer subid) {
                try {
                    Subs subscription = subsRepository.findById(subid)
                            .orElseThrow(() -> new IllegalArgumentException("Subscription not found"));
                    if (!"success".equals(subscription.getStatus())) {
                        throw new IllegalStateException("Only active subscriptions can be canceled.");
                    }
                    subscription.setStatus("canceled");
                    subsRepository.save(subscription);
                    log.info("Subscription canceled: subid={}", subid);
                    return ResponseEntity.ok("Subscription canceled successfully.");
                } catch (IllegalArgumentException | IllegalStateException e) {
                    log.error("Error canceling subscription: {}", e.getMessage());
                    return ResponseEntity.badRequest().body("Error: " + e.getMessage());
                } catch (Exception e) {
                    log.error("Unexpected error while canceling subscription: {}", e.getMessage(), e);
                    return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
                }
            }

    private LocalDateTime calculateEndDate(String typesub) {
        if (typesub == null) {
            throw new IllegalArgumentException("Subscription type cannot be null");
        }
        LocalDateTime now = LocalDateTime.now();
        switch (typesub) {
            case "1 month": return now.plusMonths(1);
            case "3 months": return now.plusMonths(3);
            case "6 months": return now.plusMonths(6);
            case "1 year": return now.plusYears(1);
            default: throw new IllegalArgumentException("Invalid subscription type: " + typesub);
        }
    }

    private String encode(String message) {
        try {
            return java.net.URLEncoder.encode(message, "UTF-8");
        } catch (Exception e) {
            return message;
        }
    }

    public static class PaymentRequest {
        private Integer subid;
        private String amount;
        private String currency;
        private String description;

        public Integer getSubid() { return subid; }
        public void setSubid(Integer subid) { this.subid = subid; }
        public String getAmount() { return amount; }
        public void setAmount(String amount) { this.amount = amount; }
        public String getCurrency() { return currency; }
        public void setCurrency(String currency) { this.currency = currency; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}