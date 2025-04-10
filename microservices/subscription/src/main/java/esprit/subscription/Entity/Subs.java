package esprit.subscription.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
@Entity
public class Subs {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer subid;

    private String typesub;
    private String subsDescription;
    private Double subsDiscountedPrice;
    private Double subsActualPrice;
    private String status;

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public Subs(Integer subid, LocalDateTime endDate, String status, Double subsActualPrice, Double subsDiscountedPrice, String subsDescription, String typesub) {
        this.subid = subid;
        this.endDate = endDate;
        this.status = status;
        this.subsActualPrice = subsActualPrice;
        this.subsDiscountedPrice = subsDiscountedPrice;
        this.subsDescription = subsDescription;
        this.typesub = typesub;
    }

    @Column(name = "end_date")
    private LocalDateTime endDate;
    public Subs() {
    }

    public Subs(Integer subid, String typesub, String subsDescription, Double subsDiscountedPrice, Double subsActualPrice, String status) {
        this.subid = subid;
        this.typesub = typesub;
        this.subsDescription = subsDescription;
        this.subsDiscountedPrice = subsDiscountedPrice;
        this.subsActualPrice = subsActualPrice;
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Subs subs = (Subs) o;
        return Objects.equals(subid, subs.subid) && Objects.equals(typesub, subs.typesub) &&
                Objects.equals(subsDescription, subs.subsDescription) &&
                Objects.equals(subsDiscountedPrice, subs.subsDiscountedPrice) &&
                Objects.equals(subsActualPrice, subs.subsActualPrice) &&
                Objects.equals(status, subs.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(subid, typesub, subsDescription, subsDiscountedPrice, subsActualPrice, status);
    }
}