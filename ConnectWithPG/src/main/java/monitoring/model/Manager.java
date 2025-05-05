package monitoring.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Data
public class Manager extends User {

    @OneToMany(mappedBy = "manager")
    Set<Task> tasks;

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", userName=" + username +
                ", password=" + password +
                '}';
    }
}
