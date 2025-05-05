package monitoring.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TimetableLoginDTO {
    private Long id;
    private String beginTime;
    private  String endTime;
    private String username;
}

/*
  {
    "beginTime": "sarafina",
    "endTime": "pisica",
        "employeeId": 1
    }

 */
