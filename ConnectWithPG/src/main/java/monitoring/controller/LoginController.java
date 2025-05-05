package monitoring.controller;

import monitoring.dto.TimetableDTO;
import monitoring.dto.UserDTO;
import monitoring.service.ServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginController {

    private final ServiceImpl service;

    public LoginController(ServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/{role}")
    public UserDTO login(@RequestBody UserDTO userDTO, @PathVariable String role) {

        return service.login(userDTO,role);
    }

}