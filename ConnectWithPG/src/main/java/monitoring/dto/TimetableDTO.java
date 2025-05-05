package monitoring.dto;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import monitoring.model.Employee;

import java.sql.Timestamp;

@Data
@Builder
public class TimetableDTO {
    private Long id;
    private String beginTime;
    private  String endTime;
    private Long employeeId;
}

/*
  {
    "beginTime": "sarafina",
    "endTime": "pisica",
        "employeeId": 1
    }

 */
