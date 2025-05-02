package monitoring.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class Manager extends User{

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", userName=" + username +
                ", password=" + password +
                '}';
    }
}
