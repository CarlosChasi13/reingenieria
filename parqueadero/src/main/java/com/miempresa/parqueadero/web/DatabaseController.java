package com.miempresa.parqueadero.web;

import com.miempresa.parqueadero.service.DatabaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class DatabaseController {

    private final DatabaseService databaseService;

    public DatabaseController(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @DeleteMapping("/vaciar")
    public ResponseEntity<String> vaciarBD() {
        databaseService.vaciarBaseDeDatos();
        return ResponseEntity.ok("Base de datos vaciada correctamente.");
    }
}
