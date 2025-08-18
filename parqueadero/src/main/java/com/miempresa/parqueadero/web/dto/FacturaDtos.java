package com.miempresa.parqueadero.web.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class FacturaDtos {
  public static class FacturaReq {
    @NotNull public Integer clienteId;
    @NotNull public Integer idMesas;
    @NotNull public LocalDate fecha;
    @NotNull public Integer totals;
    @NotNull public Integer nroBoleta;
    @NotBlank @Size(max=200) public String facturaBoleta;
  }
}
