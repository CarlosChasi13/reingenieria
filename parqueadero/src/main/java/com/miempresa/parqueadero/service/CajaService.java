package com.miempresa.parqueadero.service;

import com.miempresa.parqueadero.entity.Caja;
import com.miempresa.parqueadero.repository.CajaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class CajaService {

    private final CajaRepository repo;

    public CajaService(CajaRepository repo) {
        this.repo = repo;
    }

    public List<Caja> listar() {
        return repo.findAllByOrderByFechaAsc();
    }

    public Caja abrirCaja(Caja caja) {
        caja.setEstado("abierta");
        return repo.save(caja);
    }

    public Caja cerrarCaja(Integer id) {
        Caja c = repo.findById(id).orElseThrow();
        c.setEstado("cerrada");
        return repo.save(c);
    }

    public List<Caja> buscarPorRango(LocalDate desde, LocalDate hasta) {
        return repo.findByFechaBetweenOrderByFechaAsc(desde, hasta);
    }

    public Double totalEnRango(LocalDate desde, LocalDate hasta) {
        return repo.sumarMontosEntre(desde, hasta);
    }
}
