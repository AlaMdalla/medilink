package esprit.subscription.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CancellationReason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer subid;

    private String reason;

    private String timestamp;
}