package monitoring.service;

import monitoring.dto.*;
import monitoring.mapper.MyMapper;
import monitoring.model.*;
import monitoring.repository.TaskRepo;
import monitoring.repository.TimetableRepo;
import org.springframework.stereotype.Service;
import monitoring.repository.EmployeeRepo;
import monitoring.repository.ManagerRepo;

import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceImpl implements MyService {
    private final EmployeeRepo employeeRepo;
    private final ManagerRepo managerRepo;
    private final TaskRepo taskRepo;
    private final TimetableRepo timetableRepo;
    private final MyMapper myMapper;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");


    public ServiceImpl(EmployeeRepo employeeRepo, ManagerRepo managerRepo, TaskRepo taskRepo, TimetableRepo timetableRepo, MyMapper myMapper) {
        this.employeeRepo = employeeRepo;
        this.managerRepo = managerRepo;
        this.taskRepo = taskRepo;
        this.timetableRepo = timetableRepo;
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
    public TaskDTO saveTask(TaskDTO taskDTO) {
        Optional<Employee> employee = employeeRepo.findById(taskDTO.getEmployeeId());
        Optional<Manager> manager = managerRepo.findById(taskDTO.getManagerId());
        Task task = new Task(taskDTO.getId(), taskDTO.getDescription(), employee.get(), manager.get());
        Task saved = taskRepo.save(task);
        return myMapper.toDto(saved);
    }

    @Override
    public TimetableDTO saveTimetable(TimetableDTO timetableDTO) {
        Optional<Employee> employee = employeeRepo.findById(timetableDTO.getEmployeeId());
        Timetable timetable = myMapper.toModel(timetableDTO);
        timetable.setEmployee(employee.get());
        Timetable saved = timetableRepo.save(timetable);
        return myMapper.toDto(saved);
    }

    @Override
    public TimetableDTO findTimetableByEmployeeId(Long employeeId) {
        Timetable saved = timetableRepo.findByEmployeeId(employeeId);
        return myMapper.toDto(saved);
    }

    @Override
    public List<TaskDTO> findTaskByEmployeeId(Long employeeId) {
        List<Task> saved = taskRepo.findByEmployeeId(employeeId);
        return myMapper.toDto(saved);
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        List<Task> saved = taskRepo.findAll();
        return myMapper.toDto(saved);
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
            Manager manager = managerRepo.findByUsernameAndPassword(userDTO.username, userDTO.password);
            if (manager != null) {
                return myMapper.toDto(manager);
            }
        } else if ("employee".equals(role)) {
            Employee employee = employeeRepo.findByUsernameAndPassword(userDTO.username, userDTO.password);
            Timetable timetable = timetableRepo.findByEmployeeId(employee.getId());
/// make them null
            if (employee != null) {
                Long idEmployee = employee.getId();
                LocalDateTime currentDateTime = LocalDateTime.now();
                if (timetable == null) {
                    TimetableDTO timetableDTO = TimetableDTO.builder()
                            .employeeId(idEmployee)
                            .beginTime(currentDateTime.format(FORMATTER))
                            .endTime(null)
                            .build();
                    saveTimetable(timetableDTO);
                } else {
                    timetable.setBeginTime(Timestamp.valueOf(currentDateTime.format(FORMATTER)));
                    timetable.setEndTime(null);
                    saveTimetable(myMapper.toDto(timetable));
                }
                return myMapper.toDto(employee);
            }
        }
        return null;
    }

    @Override
    public TimetableDTO logout(Long idEmployee) {
        Timetable timetable = timetableRepo.findByEmployeeId(idEmployee);
        LocalDateTime currentDateTime = LocalDateTime.now();

        if (timetable != null) {
            try {
                Date parsedDate = dateFormat.parse(timetable.getBeginTime().toString());
                TimetableDTO timetableDTO = TimetableDTO.builder()
                        .id(timetable.getId())
                        .employeeId(idEmployee)
                        .beginTime(dateFormat.format(parsedDate))
                        .endTime(currentDateTime.format(FORMATTER))
                        .build();
                return saveTimetable(timetableDTO);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }

        }
        return null;
    }

    public TimetableDTO updateStartHour(Long employeeId, String hour) {
        Timetable timetable = timetableRepo.findByEmployeeId(employeeId);
        if (timetable != null) {
            try {
                Date parsedDate = dateFormat.parse(timetable.getBeginTime().toString());
                TimetableDTO timetableDTO = TimetableDTO.builder()
                        .id(timetable.getId())
                        .employeeId(idEmployee)
                        .beginTime(dateFormat.format(parsedDate))
                        .endTime(currentDateTime.format(FORMATTER))
                        .build();
                return saveTimetable(timetableDTO);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
    }
}
