package monitoring.repository;

import monitoring.model.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface TimetableRepo extends JpaRepository<Timetable, Long> {
    Timetable findByEmployeeId(Long employeeId);

    List<Timetable> findByEndTimeIsNullAndBeginTimeIsNotNull();
}
