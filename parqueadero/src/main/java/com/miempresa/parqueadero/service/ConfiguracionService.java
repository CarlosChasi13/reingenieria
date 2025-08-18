package com.miempresa.parqueadero.service;

import com.miempresa.parqueadero.entity.Configuracion;
import com.miempresa.parqueadero.repository.ConfiguracionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
public class ConfiguracionService {

    private final ConfiguracionRepository repo;

    public ConfiguracionService(ConfiguracionRepository repo) {
        this.repo = repo;
    }

    public Optional<Configuracion> obtenerConfiguracion() {
        return repo.findPrimera();
    }

    public Configuracion actualizar(Integer id, Configuracion datos) {
        Configuracion c = repo.findById(id).orElseThrow();
        c.setNombreEmpresa(datos.getNombreEmpresa());
        c.setImpuesto(datos.getImpuesto());
        c.setMoneda(datos.getMoneda());
        c.setSimboloMoneda(datos.getSimboloMoneda());
        c.setDireccion(datos.getDireccion());
        c.setRuc(datos.getRuc());
        c.setCelular(datos.getCelular());
        c.setDimensionX(datos.getDimensionX());
        c.setDimensionY(datos.getDimensionY());
        c.setCantidadCerosBoleta(datos.getCantidadCerosBoleta());
        c.setCantidadCerosFactura(datos.getCantidadCerosFactura());
        return repo.save(c);
    }
}
