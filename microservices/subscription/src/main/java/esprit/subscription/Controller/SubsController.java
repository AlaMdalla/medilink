package esprit.subscription.Controller;

import esprit.subscription.Entity.Subs;
import esprit.subscription.Service.SubsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subs")
public class SubsController {

    @Autowired
    private SubsService subsService;

    @PostMapping("/add")
    public ResponseEntity<Subs> addNewSubs(@RequestBody Subs subs) {
        Subs createdSubs = subsService.addNewSubs(subs);
        return ResponseEntity.ok(createdSubs);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Subs>> getAllSubs() {
        return ResponseEntity.ok(subsService.getAllSubs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subs> getSubsById(@PathVariable Integer id) {
        Subs subs = subsService.getSubsById(id);
        return subs != null ? ResponseEntity.ok(subs) : ResponseEntity.notFound().build();
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<String> getSubsStatus(@PathVariable Integer id) {
        Subs subs = subsService.getSubsById(id);
        return subs != null ? ResponseEntity.ok(subs.getStatus()) : ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Subs> updateSubs(@PathVariable Integer id, @RequestBody Subs newSubsData) {
        Subs updatedSubs = subsService.updateSubs(id, newSubsData);
        return updatedSubs != null ? ResponseEntity.ok(updatedSubs) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSubs(@PathVariable Integer id) {
        boolean isDeleted = subsService.deleteSubs(id);
        return isDeleted ? ResponseEntity.ok("Subscription deleted successfully") : ResponseEntity.notFound().build();
    }
}