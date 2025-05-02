package monitoring.service;

import monitoring.dto.EmployeeDTO;
import monitoring.dto.ManagerDTO;
import monitoring.dto.UserDTO;
import monitoring.mapper.MyMapper;
import monitoring.model.*;
import org.springframework.stereotype.Service;
import monitoring.repository.EmployeeRepo;
import monitoring.repository.ManagerRepo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceImpl implements MyService {
    private final EmployeeRepo employeeRepo;
    private final ManagerRepo managerRepo;
    private final MyMapper myMapper;

    public ServiceImpl(EmployeeRepo employeeRepo, ManagerRepo managerRepo, MyMapper myMapper) {
        this.employeeRepo = employeeRepo;
        this.managerRepo = managerRepo;
        this.myMapper = myMapper;
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepo.findAll().stream()
                .map(myMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ManagerDTO> getAllManagers() {
        return managerRepo.findAll().stream()
                .map(myMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<EmployeeDTO> getEmployeeById(Long id) {
        return employeeRepo.findById(id).map(myMapper::toDto);
    }

    @Override
    public Optional<ManagerDTO> getManagerById(Long id) {
        return managerRepo.findById(id).map(myMapper::toDto);
    }

    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {
        Employee employee = myMapper.toModel(employeeDTO);
        Employee saved = employeeRepo.save(employee);
        return myMapper.toDto(saved);
    }

    @Override
    public ManagerDTO saveManager(ManagerDTO managerDTO) {
        Manager manager = myMapper.toModel(managerDTO);
        Manager savedmanager = managerRepo.save(manager);
        return myMapper.toDto(savedmanager);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee employee = employeeRepo.findById(id).orElseThrow();
        employee.setUsername(employeeDTO.username);
        employee.setPassword(employeeDTO.password);
        Employee updated = employeeRepo.save(employee);
        return myMapper.toDto(updated);
    }

    @Override
    public ManagerDTO updateManager(Long id, ManagerDTO managerDTO) {
        Manager manager = managerRepo.findById(id).orElseThrow();
        manager.setUsername(managerDTO.username);
        manager.setPassword(managerDTO.password);
        Manager updated = managerRepo.save(manager);
        return myMapper.toDto(updated);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepo.deleteById(id);
    }

    @Override
    public void deleteManager(Long id) {
        managerRepo.deleteById(id);
    }

    @Override
    public UserDTO login(UserDTO userDTO, String role) {
        if ("manager".equals(role)) {
            Manager manager = managerRepo.findByUsernameAndPassword(userDTO.username,userDTO.password);
            if (manager != null) {
                return myMapper.toDto(manager);
            }
        } else if ("employee".equals(role)) {
            Employee employee = employeeRepo.findByUsernameAndPassword(userDTO.username,userDTO.password);
            if (employee != null) {
                //creeaza ora la care s a logat
                return myMapper.toDto(employee);
            }
        }
        return null;
    }
}
