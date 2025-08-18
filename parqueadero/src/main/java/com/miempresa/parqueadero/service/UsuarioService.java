package com.miempresa.parqueadero.service;

import com.miempresa.parqueadero.entity.Usuario;
import com.miempresa.parqueadero.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository repo;

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public Usuario registrar(Usuario u) {
        // Guardar tal cual
        return repo.save(u);
    }

    public Optional<Usuario> buscarPorUsuario(String usuario) {
        return repo.findByUsuario(usuario);
    }

    public boolean validarLogin(String usuario, String rawPassword) {
        return repo.findByUsuario(usuario)
                   .map(u -> u.getPasword().equals(rawPassword))
                   .orElse(false);
    }
}
