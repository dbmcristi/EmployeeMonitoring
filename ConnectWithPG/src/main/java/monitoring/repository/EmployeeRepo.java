package monitoring.repository;

import monitoring.dto.UserDTO;
import monitoring.model.Employee;
 import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {


 Employee findByUsernameAndPassword(String username, String password);
}