package monitoring.repository;

import monitoring.model.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;

public interface TimetableRepo extends JpaRepository<Timetable, Long> {
    Timetable findByEmployeeId(Long employeeId);
}
