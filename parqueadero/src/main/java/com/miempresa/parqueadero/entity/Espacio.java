package com.miempresa.parqueadero.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "table_espacio")
public class Espacio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_espacio")
    private Integer id;

    @Column(name = "zona", nullable = false, length = 200)
    private String zona;

    @Column(name = "estado", nullable = false, length = 200)
    private String estado; // ocupado | desocupado

    // --- getters & setters ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getZona() { return zona; }
    public void setZona(String zona) { this.zona = zona; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
