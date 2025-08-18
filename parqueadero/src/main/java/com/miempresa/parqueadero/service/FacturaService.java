package com.miempresa.parqueadero.service;

import com.miempresa.parqueadero.entity.Factura;
import com.miempresa.parqueadero.repository.FacturaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class FacturaService {

    private final FacturaRepository repo;

    public FacturaService(FacturaRepository repo) {
        this.repo = repo;
    }

    public Factura crear(Factura factura) {
        return repo.save(factura);
    }

    public List<Factura> listar() {
        return repo.listarConClienteOrdenFecha();
    }

    public List<Factura> buscarPorCliente(String q) {
        return repo.buscarPorCliente(q);
    }

    public List<Factura> buscarPorRango(LocalDate desde, LocalDate hasta) {
        return repo.findByFechaBetween(desde, hasta);
    }

    public Integer totalPorCliente(Integer idCliente) {
        return repo.sumarTotalsPorCliente(idCliente);
    }
}
