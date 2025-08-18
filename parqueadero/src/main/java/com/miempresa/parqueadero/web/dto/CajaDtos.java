package com.miempresa.parqueadero.web.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class CajaDtos {
  public static class CajaReq {
    @NotNull public LocalDate fecha;
    @NotNull public Double monto;        // si migras a DECIMAL usa BigDecimal
    @NotBlank @Size(max=200) public String estado; // abierta|cerrada
  }
}
