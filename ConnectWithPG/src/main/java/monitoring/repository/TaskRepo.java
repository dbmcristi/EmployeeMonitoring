package monitoring.repository;

import monitoring.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepo extends JpaRepository<Task, Long> {

 List<Task> findByEmployeeId(Long employeeId);


 Task findByManagerId(Long managerId);

}