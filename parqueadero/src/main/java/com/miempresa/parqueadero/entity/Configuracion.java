package com.miempresa.parqueadero.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "table_configuracion")
public class Configuracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_configuracion")
    private Integer id;

    @Column(name = "nombre_empresa", nullable = false, length = 200)
    private String nombreEmpresa;

    @Column(name = "impuesto", nullable = false, length = 200)
    private String impuesto;

    @Column(name = "moneda", nullable = false, length = 200)
    private String moneda;

    @Column(name = "simbolo_moneda", nullable = false, length = 200)
    private String simboloMoneda;

    @Column(name = "direccion", nullable = false, length = 200)
    private String direccion;

    @Column(name = "ruc", nullable = false, length = 200)
    private String ruc;

    @Column(name = "celular", nullable = false, length = 200)
    private String celular;

    @Column(name = "dimension_x", nullable = false, length = 200)
    private String dimensionX;

    @Column(name = "dimension_y", nullable = false, length = 200)
    private String dimensionY;

    @Column(name = "cantidad_ceros_boleta", nullable = false, length = 200)
    private String cantidadCerosBoleta;

    @Column(name = "cantidad_ceros_factura", nullable = false, length = 200)
    private String cantidadCerosFactura;

    // --- getters & setters ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombreEmpresa() { return nombreEmpresa; }
    public void setNombreEmpresa(String nombreEmpresa) { this.nombreEmpresa = nombreEmpresa; }
    public String getImpuesto() { return impuesto; }
    public void setImpuesto(String impuesto) { this.impuesto = impuesto; }
    public String getMoneda() { return moneda; }
    public void setMoneda(String moneda) { this.moneda = moneda; }
    public String getSimboloMoneda() { return simboloMoneda; }
    public void setSimboloMoneda(String simboloMoneda) { this.simboloMoneda = simboloMoneda; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getRuc() { return ruc; }
    public void setRuc(String ruc) { this.ruc = ruc; }
    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }
    public String getDimensionX() { return dimensionX; }
    public void setDimensionX(String dimensionX) { this.dimensionX = dimensionX; }
    public String getDimensionY() { return dimensionY; }
    public void setDimensionY(String dimensionY) { this.dimensionY = dimensionY; }
    public String getCantidadCerosBoleta() { return cantidadCerosBoleta; }
    public void setCantidadCerosBoleta(String cantidadCerosBoleta) { this.cantidadCerosBoleta = cantidadCerosBoleta; }
    public String getCantidadCerosFactura() { return cantidadCerosFactura; }
    public void setCantidadCerosFactura(String cantidadCerosFactura) { this.cantidadCerosFactura = cantidadCerosFactura; }
}
