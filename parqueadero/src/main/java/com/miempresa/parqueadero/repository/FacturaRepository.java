package com.miempresa.parqueadero.repository;

import java.time.LocalDate;
import java.util.List;

import com.miempresa.parqueadero.entity.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FacturaRepository extends JpaRepository<Factura, Integer> {

    // Traer con cliente (join fetch) y ordenar por fecha
    @Query("""
           select f
           from Factura f
           join fetch f.cliente c
           order by f.fecha asc
           """)
    List<Factura> listarConClienteOrdenFecha();

    // Buscar por fragmento del nombre/apellido del cliente
    @Query("""
           select f
           from Factura f
           join f.cliente c
           where lower(c.nombreCliente)  like lower(concat('%', :q, '%'))
              or lower(c.apellidoCliente) like lower(concat('%', :q, '%'))
           order by f.fecha asc
           """)
    List<Factura> buscarPorCliente(@Param("q") String q);

    // Rangos de fecha
    List<Factura> findByFechaBetween(LocalDate desde, LocalDate hasta);

    // Por número de boleta/factura
    List<Factura> findByNroBoleta(Integer nroBoleta);
    List<Factura> findByFacturaBoleta(String facturaBoleta);

    // Totales para reportes
    @Query("select coalesce(sum(f.totals), 0) from Factura f where f.fecha between :desde and :hasta")
    Integer sumarTotalsEntre(@Param("desde") LocalDate desde, @Param("hasta") LocalDate hasta);

    @Query("select coalesce(sum(f.totals), 0) from Factura f where f.cliente.idCliente = :idCliente")
    Integer sumarTotalsPorCliente(@Param("idCliente") Integer idCliente);
}
