package monitoring.controller;

import monitoring.dto.TimetableDTO;
import monitoring.service.ServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/logout")
@CrossOrigin(origins = "*")
public class LogoutController {

    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    /// basically this marks the end date
    private final ServiceImpl service;

    public LogoutController(ServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/{idEmployee}")
    public TimetableDTO updateTimetable(@PathVariable Long idEmployee) {
             return service.logout(idEmployee);
    }
}