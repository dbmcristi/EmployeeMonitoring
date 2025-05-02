package monitoring.service;

import monitoring.dto.EmployeeDTO;
import monitoring.dto.ManagerDTO;
import monitoring.dto.UserDTO;

import java.util.List;
import java.util.Optional;


public interface MyService {
    List<EmployeeDTO> getAllEmployees();

    List<ManagerDTO> getAllManagers();

    Optional<EmployeeDTO> getEmployeeById(Long id);

    Optional<ManagerDTO> getManagerById(Long id);

    EmployeeDTO saveEmployee(EmployeeDTO employeeDTO);

    ManagerDTO saveManager(ManagerDTO managerDTO);

    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);

    ManagerDTO updateManager(Long id, ManagerDTO managerDTO);

    void deleteEmployee(Long id);

    void deleteManager(Long id);

    UserDTO login(UserDTO userDTO, String role);
}