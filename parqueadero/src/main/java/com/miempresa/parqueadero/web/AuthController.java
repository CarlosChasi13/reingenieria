package com.miempresa.parqueadero.web;

import com.miempresa.parqueadero.entity.Usuario;
import com.miempresa.parqueadero.service.UsuarioService;
import com.miempresa.parqueadero.web.dto.AuthDtos.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UsuarioService service;

    public AuthController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/usuarios")
    public Usuario registrar(@Valid @RequestBody UsuarioReq req) {
        Usuario u = new Usuario();
        u.setUsuario(req.usuario);
        u.setPasword(req.pasword); // se guarda en texto plano
        u.setTipo(req.tipo);
        u.setNombres(req.nombres);
        u.setApellidos(req.apellidos);
        u.setDni(req.dni);
        u.setTelefono(req.telefono);
        return service.registrar(u);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthRes> login(@Valid @RequestBody LoginReq req) {
        boolean ok = service.validarLogin(req.usuario, req.pasword);
        AuthRes res = new AuthRes();
        res.ok = ok;
        res.message = ok ? "Login correcto" : "Credenciales inválidas";
        return ok ? ResponseEntity.ok(res) : ResponseEntity.status(401).body(res);
    }
}
