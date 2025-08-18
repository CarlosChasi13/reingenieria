package com.miempresa.parqueadero.web;

import com.miempresa.parqueadero.entity.Cliente;
import com.miempresa.parqueadero.entity.Factura;
import com.miempresa.parqueadero.repository.ClienteRepository;
import com.miempresa.parqueadero.service.FacturaService;
import com.miempresa.parqueadero.web.dto.FacturaDtos.FacturaReq;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/facturas")
public class FacturaController {

  private final FacturaService service;
  private final ClienteRepository clienteRepo;

  public FacturaController(FacturaService service, ClienteRepository clienteRepo) {
    this.service = service; this.clienteRepo = clienteRepo;
  }

  @GetMapping
  public List<Factura> listar(@RequestParam(required=false) String cliente,
                              @RequestParam(required=false) String desde,
                              @RequestParam(required=false) String hasta) {
    if (cliente != null) return service.buscarPorCliente(cliente);
    if (desde != null && hasta != null) return service.buscarPorRango(LocalDate.parse(desde), LocalDate.parse(hasta));
    return service.listar();
  }

  @PostMapping
  public Factura crear(@Valid @RequestBody FacturaReq req) {
    Cliente cli = clienteRepo.findById(req.clienteId).orElseThrow();
    Factura f = new Factura();
    f.setCliente(cli);
    f.setIdMesas(req.idMesas);
    f.setFecha(req.fecha);
    f.setTotals(req.totals);
    f.setNroBoleta(req.nroBoleta);
    f.setFacturaBoleta(req.facturaBoleta);
    return service.crear(f);
  }

  @GetMapping("/total-por-cliente/{idCliente}")
  public Integer totalPorCliente(@PathVariable Integer idCliente) {
    return service.totalPorCliente(idCliente);
  }
}
