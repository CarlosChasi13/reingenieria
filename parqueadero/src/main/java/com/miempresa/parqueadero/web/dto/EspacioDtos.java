package com.miempresa.parqueadero.web.dto;

import jakarta.validation.constraints.*;

public class EspacioDtos {
  public static class EspacioReq {
    @NotBlank @Size(max=200) public String zona;
    @NotBlank @Size(max=200) public String estado;
  }
  public static class CambiarEstadoReq {
    @NotBlank @Size(max=200) public String estado;
  }
}
