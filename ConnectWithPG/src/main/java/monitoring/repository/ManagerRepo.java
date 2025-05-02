package monitoring.repository;

import monitoring.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepo extends JpaRepository<Manager, Long> {

    Manager findByUsernameAndPassword(String username, String password);
}