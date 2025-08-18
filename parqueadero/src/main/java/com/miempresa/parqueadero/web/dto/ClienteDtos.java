package com.miempresa.parqueadero.web.dto;

import jakarta.validation.constraints.*;

public class ClienteDtos {
  public static class ClienteReq {
    @NotBlank @Size(max = 45) public String nombreCliente;
    @NotBlank @Size(max = 45) public String apellidoCliente;
    @NotBlank @Size(max = 200) public String razonSCliente;
    @NotBlank @Size(max = 20)  public String rucCliente;
    @NotBlank @Size(max = 100) public String direccionCliente;
    @NotBlank @Size(max = 20)  public String telefonoCliente;
    @NotBlank @Email @Size(max = 50) public String correoCliente;
  }

  public static class ClienteRes {
    public Integer idCliente;
    public String nombreCliente, apellidoCliente, razonSCliente, rucCliente,
                  direccionCliente, telefonoCliente, correoCliente;
  }
}
