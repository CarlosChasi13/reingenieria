package com.miempresa.parqueadero.service;

import com.miempresa.parqueadero.entity.Cliente;
import com.miempresa.parqueadero.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClienteService {

    private final ClienteRepository repo;

    public ClienteService(ClienteRepository repo) {
        this.repo = repo;
    }

    public List<Cliente> listarOrdenados() {
        return repo.findAllByOrderByNombreClienteAsc();
    }

    public Cliente crear(Cliente cliente) {
        // Validaciones extra si quieres (ej. evitar duplicados)
        return repo.save(cliente);
    }

    public Optional<Cliente> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public List<Cliente> buscarPorNombre(String q) {
        return repo.findByNombreClienteContainingIgnoreCase(q);
    }

    public Cliente actualizar(Integer id, Cliente datos) {
        Cliente c = repo.findById(id).orElseThrow();
        c.setNombreCliente(datos.getNombreCliente());
        c.setApellidoCliente(datos.getApellidoCliente());
        c.setRazonSCliente(datos.getRazonSCliente());
        c.setRucCliente(datos.getRucCliente());
        c.setDireccionCliente(datos.getDireccionCliente());
        c.setTelefonoCliente(datos.getTelefonoCliente());
        c.setCorreoCliente(datos.getCorreoCliente());
        return repo.save(c);
    }

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
}
