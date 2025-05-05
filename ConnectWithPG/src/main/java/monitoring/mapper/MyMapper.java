package monitoring.mapper;

import monitoring.dto.*;
import monitoring.model.Employee;
import monitoring.model.Manager;
import monitoring.model.Task;
import monitoring.model.Timetable;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.text.SimpleDateFormat;

@Mapper(componentModel = "spring")
public interface MyMapper {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

    Employee toModel(EmployeeDTO source);

    Manager toModel(ManagerDTO source);

    EmployeeDTO toDto(Employee source);

    ManagerDTO toDto(Manager source);

       List<TaskDTO> toDto(List<Task> source);

    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "manager.id", target = "managerId")
    TaskDTO toDto(Task source);

    @Mapping(source = "beginTime", target = "beginTime", qualifiedByName = "mapToTimestamp")
    @Mapping(source = "endTime", target = "endTime", qualifiedByName = "mapToTimestamp")
    Timetable toModel(TimetableDTO source);

    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "beginTime", target = "beginTime", qualifiedByName = "mapToString")
    @Mapping(source = "endTime", target = "endTime", qualifiedByName = "mapToString")
    TimetableDTO toDto(Timetable source);

    @Named("mapToString")
    default String map(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        try {
            Date parsedDate = dateFormat.parse(timestamp.toString());
            return dateFormat.format(parsedDate);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    @Named("mapToTimestamp")
    default Timestamp map(String value) {
        return value == null ? null : Timestamp.valueOf(value);
    }


}
