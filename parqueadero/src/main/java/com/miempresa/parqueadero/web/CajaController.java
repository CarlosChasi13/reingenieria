package com.miempresa.parqueadero.web;

import com.miempresa.parqueadero.entity.Caja;
import com.miempresa.parqueadero.service.CajaService;
import com.miempresa.parqueadero.web.dto.CajaDtos.CajaReq;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/cajas")
public class CajaController {

  private final CajaService service;

  public CajaController(CajaService service) { this.service = service; }

  @GetMapping
  public List<Caja> listar(@RequestParam(required=false) String desde,
                           @RequestParam(required=false) String hasta) {
    if (desde != null && hasta != null) {
      return service.buscarPorRango(LocalDate.parse(desde), LocalDate.parse(hasta));
    }
    return service.listar();
  }

  @PostMapping("/abrir")
  public Caja abrir(@Valid @RequestBody CajaReq req) {
    Caja c = new Caja();
    c.setFecha(req.fecha);
    c.setMonto(req.monto);
    c.setEstado("abierta");
    return service.abrirCaja(c);
  }

  @PatchMapping("/{id}/cerrar")
  public Caja cerrar(@PathVariable Integer id) {
    return service.cerrarCaja(id);
  }

  @GetMapping("/total")
  public Double total(@RequestParam String desde, @RequestParam String hasta) {
    return service.totalEnRango(LocalDate.parse(desde), LocalDate.parse(hasta));
  }
}
