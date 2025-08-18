package com.miempresa.parqueadero.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.miempresa.parqueadero.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsuario(String usuario);

    boolean existsByUsuario(String usuario);

    // Si luego agregas email en la tabla:
    // Optional<Usuario> findByEmail(String email);
}
