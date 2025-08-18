package com.miempresa.parqueadero.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "table_cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCliente")
    private Integer idCliente;

    @Column(name = "Nombre_Cliente", nullable = false, length = 45)
    private String nombreCliente;

    @Column(name = "Apellido_Cliente", nullable = false, length = 45)
    private String apellidoCliente;

    @Column(name = "razon_s_Cliente", nullable = false, length = 200)
    private String razonSCliente;

    @Column(name = "ruc_Cliente", nullable = false, length = 20)
    private String rucCliente;

    @Column(name = "direccion_Cliente", nullable = false, length = 100)
    private String direccionCliente;

    @Column(name = "telefono_Cliente", nullable = false, length = 20)
    private String telefonoCliente;

    @Column(name = "correo_Cliente", nullable = false, length = 50)
    private String correoCliente;

    // --- getters & setters ---
    public Integer getIdCliente() { return idCliente; }
    public void setIdCliente(Integer idCliente) { this.idCliente = idCliente; }
    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }
    public String getApellidoCliente() { return apellidoCliente; }
    public void setApellidoCliente(String apellidoCliente) { this.apellidoCliente = apellidoCliente; }
    public String getRazonSCliente() { return razonSCliente; }
    public void setRazonSCliente(String razonSCliente) { this.razonSCliente = razonSCliente; }
    public String getRucCliente() { return rucCliente; }
    public void setRucCliente(String rucCliente) { this.rucCliente = rucCliente; }
    public String getDireccionCliente() { return direccionCliente; }
    public void setDireccionCliente(String direccionCliente) { this.direccionCliente = direccionCliente; }
    public String getTelefonoCliente() { return telefonoCliente; }
    public void setTelefonoCliente(String telefonoCliente) { this.telefonoCliente = telefonoCliente; }
    public String getCorreoCliente() { return correoCliente; }
    public void setCorreoCliente(String correoCliente) { this.correoCliente = correoCliente; }
}
