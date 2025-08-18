package com.miempresa.parqueadero.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.miempresa.parqueadero.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    // Listar ordenado (equivalente a SELECT * ORDER BY Nombre_Cliente ASC)
    List<Cliente> findAllByOrderByNombreClienteAsc();

    // Búsquedas por texto (LIKE)
    List<Cliente> findByNombreClienteContainingIgnoreCase(String q);
    List<Cliente> findByApellidoClienteContainingIgnoreCase(String q);
    List<Cliente> findByRazonSClienteContainingIgnoreCase(String q);

    // Validaciones de unicidad (si en tu lógica aplican)
    boolean existsByRucCliente(String ruc);
    boolean existsByCorreoCliente(String correo);
    boolean existsByTelefonoCliente(String telefono);

    // Accesos directos
    Optional<Cliente> findByRucCliente(String ruc);
    Optional<Cliente> findByCorreoCliente(String correo);
}
