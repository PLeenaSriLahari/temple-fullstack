package com.klef.temple.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.temple.model.Temple;
import com.klef.temple.service.TempleService;

@RestController
@RequestMapping("/templeapi/")
@CrossOrigin(origins = "*")
public class TempleController {

    @Autowired
    private TempleService templeService;

    @GetMapping("/")
    public String home() {
        return "Temple Management API is running";
    }

    @PostMapping("/add")
    public ResponseEntity<Temple> addTemple(@RequestBody Temple temple) {
        Temple savedTemple = templeService.addTemple(temple);
        return new ResponseEntity<>(savedTemple, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Temple>> getAllTemples() {
        List<Temple> temples = templeService.getAllTemples();
        return new ResponseEntity<>(temples, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getTempleById(@PathVariable int id) {
        Temple temple = templeService.getTempleById(id);
        if (temple != null) {
            return new ResponseEntity<>(temple, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Temple with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTemple(@RequestBody Temple temple) {
        Temple existing = templeService.getTempleById(temple.getTempleId());
        if (existing != null) {
            Temple updatedTemple = templeService.updateTemple(temple);
            return new ResponseEntity<>(updatedTemple, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Temple with ID " + temple.getTempleId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTemple(@PathVariable int id) {
        Temple existing = templeService.getTempleById(id);
        if (existing != null) {
            templeService.deleteTempleById(id);
            return new ResponseEntity<>("Temple with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Temple with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
