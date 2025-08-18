package com.miempresa.parqueadero.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "usuario", nullable = false, length = 50)
    private String usuario;

    @Column(name = "pasword", nullable = false, length = 50)
    private String pasword;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "nombres", nullable = false, length = 100)
    private String nombres;

    @Column(name = "apellidos", nullable = false, length = 100)
    private String apellidos;

    @Column(name = "dni", nullable = false)
    private Integer dni;

    @Column(name = "telefono", nullable = false)
    private Integer telefono;

    // --- getters & setters ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getPasword() { return pasword; }
    public void setPasword(String pasword) { this.pasword = pasword; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }
    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    public Integer getDni() { return dni; }
    public void setDni(Integer dni) { this.dni = dni; }
    public Integer getTelefono() { return telefono; }
    public void setTelefono(Integer telefono) { this.telefono = telefono; }
}
