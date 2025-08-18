package com.miempresa.parqueadero.web.dto;

import jakarta.validation.constraints.*;

public class ConfiguracionDtos {
  public static class ConfiguracionReq {
    @NotBlank @Size(max=200) public String nombreEmpresa;
    @NotBlank @Size(max=200) public String impuesto;
    @NotBlank @Size(max=200) public String moneda;
    @NotBlank @Size(max=200) public String simboloMoneda;
    @NotBlank @Size(max=200) public String direccion;
    @NotBlank @Size(max=200) public String ruc;
    @NotBlank @Size(max=200) public String celular;
    @NotBlank @Size(max=200) public String dimensionX;
    @NotBlank @Size(max=200) public String dimensionY;
    @NotBlank @Size(max=200) public String cantidadCerosBoleta;
    @NotBlank @Size(max=200) public String cantidadCerosFactura;
  }
}
