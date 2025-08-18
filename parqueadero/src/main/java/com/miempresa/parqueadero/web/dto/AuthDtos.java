package com.miempresa.parqueadero.web.dto;

import jakarta.validation.constraints.*;

public class AuthDtos {
  public static class UsuarioReq {
    @NotBlank @Size(max=50) public String usuario;
    @NotBlank @Size(max=50) public String pasword; // se hashea en service
    @NotBlank @Size(max=50) public String tipo;
    @NotBlank @Size(max=100) public String nombres;
    @NotBlank @Size(max=100) public String apellidos;
    @NotNull public Integer dni;
    @NotNull public Integer telefono;
  }
  public static class LoginReq {
    @NotBlank public String usuario;
    @NotBlank public String pasword;
  }
  public static class AuthRes {
    public boolean ok;
    public String message;
  }
}
