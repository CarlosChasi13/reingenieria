package com.miempresa.parqueadero.web;

import com.miempresa.parqueadero.entity.Configuracion;
import com.miempresa.parqueadero.service.ConfiguracionService;
import com.miempresa.parqueadero.web.dto.ConfiguracionDtos.ConfiguracionReq;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/config")
public class ConfiguracionController {

  private final ConfiguracionService service;

  public ConfiguracionController(ConfiguracionService service) { this.service = service; }

  @GetMapping
  public Configuracion obtener() {
    return service.obtenerConfiguracion().orElseThrow();
  }

  @PutMapping("/{id}")
  public Configuracion actualizar(@PathVariable Integer id, @Valid @RequestBody ConfiguracionReq req) {
    Configuracion data = new Configuracion();
    data.setNombreEmpresa(req.nombreEmpresa);
    data.setImpuesto(req.impuesto);
    data.setMoneda(req.moneda);
    data.setSimboloMoneda(req.simboloMoneda);
    data.setDireccion(req.direccion);
    data.setRuc(req.ruc);
    data.setCelular(req.celular);
    data.setDimensionX(req.dimensionX);
    data.setDimensionY(req.dimensionY);
    data.setCantidadCerosBoleta(req.cantidadCerosBoleta);
    data.setCantidadCerosFactura(req.cantidadCerosFactura);
    return service.actualizar(id, data);
  }
}
