package com.miempresa.parqueadero.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.miempresa.parqueadero.entity.Caja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CajaRepository extends JpaRepository<Caja, Integer> {

    // Listado
    List<Caja> findAllByOrderByFechaAsc();

    // Filtrar por estado (abierto/cerrado) y orden
    List<Caja> findByEstadoIgnoreCaseOrderByIdAsc(String estado);

    // Rango de fechas
    List<Caja> findByFechaBetweenOrderByFechaAsc(LocalDate desde, LocalDate hasta);

    // Última caja (por fecha o por id)
    Optional<Caja> findTopByOrderByFechaDesc();
    Optional<Caja> findTopByOrderByIdDesc();

    // Suma de montos (útil para cierres o reportes)
    @Query("select coalesce(sum(c.monto), 0) from Caja c where c.fecha between :desde and :hasta")
    Double sumarMontosEntre(LocalDate desde, LocalDate hasta);

    @Query("select coalesce(sum(c.monto), 0) from Caja c where lower(c.estado) = lower(:estado)")
    Double sumarMontosPorEstado(String estado);
}
