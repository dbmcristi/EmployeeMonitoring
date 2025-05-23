package monitoring.controller;

import monitoring.dto.HourDTO;
import monitoring.dto.TimetableDTO;
import monitoring.service.ServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timetable")
@CrossOrigin(origins = "*")
public class TimetableController {

    private final ServiceImpl service;

    public TimetableController(ServiceImpl service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public TimetableDTO getTimetableByEmployeeId(@PathVariable Long id) {
        return service.findTimetableByEmployeeId(id);
    }

//    @PatchMapping("")
//    public TimetableDTO updateTimetable(@RequestBody TimetableDTO TimetableDTO) {
//        return service.saveTimetable(TimetableDTO);
//    }
    @PatchMapping("/{employeeId}")
    public TimetableDTO updateStartDate(@PathVariable Long employeeId,@RequestBody HourDTO myHour) {
        //se pune begin date ul cand apasa butonul
        return service.updateStartHour(employeeId, myHour.getHour(), myHour.getMinutes(), myHour.getSeconds());
    }
}