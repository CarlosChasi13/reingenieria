package com.miempresa.parqueadero.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.miempresa.parqueadero.entity.Espacio;

public interface EspacioRepository extends JpaRepository<Espacio, Integer> {

    // Listar por estado (ocupado/desocupado) y todo ordenado por id
    List<Espacio> findByEstado(String estado);
    List<Espacio> findAllByOrderByIdAsc();

    // Cambiar estado rápido (UPDATE table_espacio SET estado=? WHERE id_espacio=?)
    @Modifying
    @Transactional
    @Query("update Espacio e set e.estado = :estado where e.id = :id")
    int actualizarEstado(@Param("id") Integer id, @Param("estado") String estado);

    // Contadores útiles
    long countByEstado(String estado);
}
