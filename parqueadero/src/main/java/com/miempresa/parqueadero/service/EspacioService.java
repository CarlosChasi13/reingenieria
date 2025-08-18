package com.miempresa.parqueadero.service;

import com.miempresa.parqueadero.entity.Espacio;
import com.miempresa.parqueadero.repository.EspacioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class EspacioService {

    private final EspacioRepository repo;

    public EspacioService(EspacioRepository repo) {
        this.repo = repo;
    }

    public List<Espacio> listarTodos() {
        return repo.findAllByOrderByIdAsc();
    }

    public List<Espacio> listarPorEstado(String estado) {
        return repo.findByEstado(estado);
    }

    public Espacio crear(Espacio espacio) {
        return repo.save(espacio);
    }

    public Espacio cambiarEstado(Integer id, String nuevoEstado) {
        Espacio e = repo.findById(id).orElseThrow();
        e.setEstado(nuevoEstado);
        return repo.save(e);
    }
}
