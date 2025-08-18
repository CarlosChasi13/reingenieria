package com.miempresa.parqueadero.web;

import com.miempresa.parqueadero.entity.Espacio;
import com.miempresa.parqueadero.service.EspacioService;
import com.miempresa.parqueadero.web.dto.EspacioDtos.CambiarEstadoReq;
import com.miempresa.parqueadero.web.dto.EspacioDtos.EspacioReq;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/espacios")
public class EspacioController {

  private final EspacioService service;

  public EspacioController(EspacioService service) { this.service = service; }

  @GetMapping
  public List<Espacio> listar(@RequestParam(required=false) String estado) {
    if (estado != null) return service.listarPorEstado(estado);
    return service.listarTodos();
  }

  @PostMapping
  public Espacio crear(@Valid @RequestBody EspacioReq req) {
    Espacio e = new Espacio();
    e.setZona(req.zona);
    e.setEstado(req.estado);
    return service.crear(e);
  }

  @PatchMapping("/{id}/estado")
  public Espacio cambiarEstado(@PathVariable Integer id, @Valid @RequestBody CambiarEstadoReq req) {
    return service.cambiarEstado(id, req.estado);
  }
}
