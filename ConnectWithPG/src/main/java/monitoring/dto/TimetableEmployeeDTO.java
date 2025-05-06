package monitoring.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TimetableEmployeeDTO {
    private Long employeeId;
    private  String username;
    private String beginTime;
}