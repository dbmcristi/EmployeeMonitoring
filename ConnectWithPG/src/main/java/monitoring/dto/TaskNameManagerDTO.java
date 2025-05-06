package monitoring.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskNameManagerDTO {

    private Long id;

    private String description;

    private Long employeeId;

    private String manager;
}
