package monitoring.service;

import monitoring.dto.*;

import java.util.List;
import java.util.Optional;


public interface MyService {
    List<EmployeeDTO> getAllEmployees();

    List<ManagerDTO> getAllManagers();

    Optional<EmployeeDTO> getEmployeeById(Long id);

    Optional<ManagerDTO> getManagerById(Long id);

    EmployeeDTO saveEmployee(EmployeeDTO employeeDTO);

    ManagerDTO saveManager(ManagerDTO managerDTO);

    TaskDTO saveTask(TaskDTO taskDTO);

    List<TaskDTO> findTaskByEmployeeId(Long employeeId);

    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);

    ManagerDTO updateManager(Long id, ManagerDTO managerDTO);

    void deleteEmployee(Long id);

    void deleteManager(Long id);

    UserDTO login(UserDTO userDTO, String role);

    List<TaskDTO> getAllTasks();

    TimetableDTO saveTimetable(TimetableDTO timetableDTO);

    TimetableDTO findTimetableByEmployeeId(Long employeeId);

    TimetableDTO logout(Long idEmployee);
}