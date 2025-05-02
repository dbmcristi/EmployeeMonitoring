package monitoring.mapper;


import monitoring.dto.EmployeeDTO;
import monitoring.dto.ManagerDTO;
import monitoring.model.Employee;
import monitoring.model.Manager;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MyMapper {
    Employee toModel(EmployeeDTO source);
    Manager toModel(ManagerDTO source);

    EmployeeDTO toDto( Employee source);
    ManagerDTO toDto(Manager source);
}
