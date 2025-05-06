package monitoring.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HourDTO {

    private int hour;

    private int minutes;
    private int seconds;
}
