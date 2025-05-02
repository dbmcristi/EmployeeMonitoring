package monitoring.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Timetable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String loginTime;
    String logoutTime;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    Long employeeId;

}
