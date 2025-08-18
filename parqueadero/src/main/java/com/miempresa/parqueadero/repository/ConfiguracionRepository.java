package com.miempresa.parqueadero.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.miempresa.parqueadero.entity.Configuracion;

public interface ConfiguracionRepository extends JpaRepository<Configuracion, Integer> {

    // Si manejas una sola fila de configuración:
    @Query("select c from Configuracion c order by c.id asc")
    Optional<Configuracion> findPrimera();

    // O directo por id=1 si es tu convención:
    Optional<Configuracion> findById(Integer id);
}
