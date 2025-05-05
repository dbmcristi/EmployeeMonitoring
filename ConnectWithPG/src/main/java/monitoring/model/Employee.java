package monitoring.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Data
public class Employee extends User {

    @OneToMany(mappedBy = "employee")
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
