package monitoring.controller;


import monitoring.dto.EmployeeDTO;
import monitoring.dto.ManagerDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import monitoring.service.ServiceImpl;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/manager")
@CrossOrigin(origins = "*")
public class ManagerController {

    private final ServiceImpl service;

    public ManagerController(ServiceImpl service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<ManagerDTO> getAllManagers() {
        return service.getAllManagers();
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<ManagerDTO> getManagerById(@PathVariable Long id) {
        Optional<ManagerDTO> product = service.getManagerById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    

    @PostMapping("")
    public ManagerDTO createManager(@RequestBody ManagerDTO managerDTO) {
        return service.saveManager(managerDTO);
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<ManagerDTO> updateManager(@PathVariable Long id, @RequestBody ManagerDTO managerDTO) {
        try {
            ManagerDTO updatedProduct = service.updateManager(id,  managerDTO);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManager(@PathVariable Long id) {
        service.deleteManager(id);
        return ResponseEntity.noContent().build();
    }

}