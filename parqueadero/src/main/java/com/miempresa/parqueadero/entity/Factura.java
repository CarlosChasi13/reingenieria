package com.miempresa.parqueadero.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "table_facturas")
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "No_Facturas")
    private Integer id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente", referencedColumnName = "idCliente", nullable = false)
    private Cliente cliente;

    @Column(name = "id_mesas", nullable = false)
    private Integer idMesas; // no hay FK definida en el dump

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "totals", nullable = false)
    private Integer totals;

    @Column(name = "nro_boleta", nullable = false)
    private Integer nroBoleta;

    @Column(name = "factura_boleta", nullable = false, length = 200)
    private String facturaBoleta;

    // --- getters & setters ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }
    public Integer getIdMesas() { return idMesas; }
    public void setIdMesas(Integer idMesas) { this.idMesas = idMesas; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public Integer getTotals() { return totals; }
    public void setTotals(Integer totals) { this.totals = totals; }
    public Integer getNroBoleta() { return nroBoleta; }
    public void setNroBoleta(Integer nroBoleta) { this.nroBoleta = nroBoleta; }
    public String getFacturaBoleta() { return facturaBoleta; }
    public void setFacturaBoleta(String facturaBoleta) { this.facturaBoleta = facturaBoleta; }
}
