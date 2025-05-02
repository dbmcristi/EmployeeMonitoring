package monitoring.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class ManagerDTO extends UserDTO {
    public Long id;

}