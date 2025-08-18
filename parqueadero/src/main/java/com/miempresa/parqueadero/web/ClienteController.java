package com.miempresa.parqueadero.web;

import com.miempresa.parqueadero.entity.Cliente;
import com.miempresa.parqueadero.service.ClienteService;
import com.miempresa.parqueadero.web.dto.ClienteDtos.ClienteReq;
import com.miempresa.parqueadero.web.dto.ClienteDtos.ClienteRes;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

  private final ClienteService service;

  public ClienteController(ClienteService service) { this.service = service; }

  @GetMapping
  public List<Cliente> listar(@RequestParam(required=false) String nombre,
                              @RequestParam(required=false) String apellido,
                              @RequestParam(required=false, name="razon") String razon) {
    if (nombre != null)   return service.buscarPorNombre(nombre);
    if (apellido != null) return service.buscarPorNombre(apellido); // si quieres otro método, crea buscarPorApellido
    if (razon != null)    return service.buscarPorNombre(razon);    // idem para razón social
    return service.listarOrdenados();
  }

  @PostMapping
  public ResponseEntity<ClienteRes> crear(@Valid @RequestBody ClienteReq req) {
    Cliente c = new Cliente();
    c.setNombreCliente(req.nombreCliente);
    c.setApellidoCliente(req.apellidoCliente);
    c.setRazonSCliente(req.razonSCliente);
    c.setRucCliente(req.rucCliente);
    c.setDireccionCliente(req.direccionCliente);
    c.setTelefonoCliente(req.telefonoCliente);
    c.setCorreoCliente(req.correoCliente);
    c = service.crear(c);

    ClienteRes res = toRes(c);
    return ResponseEntity.created(URI.create("/api/clientes/" + c.getIdCliente())).body(res);
  }

  @PutMapping("/{id}")
  public ClienteRes actualizar(@PathVariable Integer id, @Valid @RequestBody ClienteReq req) {
    Cliente data = new Cliente();
    data.setNombreCliente(req.nombreCliente);
    data.setApellidoCliente(req.apellidoCliente);
    data.setRazonSCliente(req.razonSCliente);
    data.setRucCliente(req.rucCliente);
    data.setDireccionCliente(req.direccionCliente);
    data.setTelefonoCliente(req.telefonoCliente);
    data.setCorreoCliente(req.correoCliente);
    return toRes(service.actualizar(id, data));
  }

  @DeleteMapping("/{id}")
  public void eliminar(@PathVariable Integer id) { service.eliminar(id); }

  private static ClienteRes toRes(Cliente c){
    ClienteRes r = new ClienteRes();
    r.idCliente = c.getIdCliente();
    r.nombreCliente = c.getNombreCliente();
    r.apellidoCliente = c.getApellidoCliente();
    r.razonSCliente = c.getRazonSCliente();
    r.rucCliente = c.getRucCliente();
    r.direccionCliente = c.getDireccionCliente();
    r.telefonoCliente = c.getTelefonoCliente();
    r.correoCliente = c.getCorreoCliente();
    return r;
  }
}
