package monitoring.controller;

import monitoring.dto.TaskDTO;
import monitoring.dto.TaskNameManagerDTO;
import monitoring.service.ServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "*")
public class TaskController {

    private final ServiceImpl service;

    public TaskController(ServiceImpl service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<TaskDTO> getAllTasks() {
        return service.getAllTasks();
    }


    @GetMapping("/{id}")
    public List<TaskNameManagerDTO> getTaskByEmployeeId(@PathVariable Long id) {
        return service.findTaskByEmployeeIdList(id);
    }

    @PostMapping("")
    public TaskDTO createTask(@RequestBody TaskDTO TaskDTO) {
        return service.saveTask(TaskDTO);
    }

}