package esprit.subscription.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_mapping")
public class PaymentMapping {

    @Id
    private String paymentId;

    private Integer subid;

    // Getters and setters
    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public Integer getSubid() {
        return subid;
    }

    public void setSubid(Integer subid) {
        this.subid = subid;
    }

    @Override
    public String toString() {
        return "PaymentMapping{" +
                "paymentId='" + paymentId + '\'' +
                ", subid=" + subid +
                '}';
    }
}