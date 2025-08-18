const API_BASE_URL = "http://localhost:8080/api"

export interface Cliente {
  idCliente?: number
  nombreCliente: string
  apellidoCliente: string
  razonSCliente: string
  rucCliente: string
  direccionCliente: string
  telefonoCliente: string
  correoCliente: string
}

export interface Espacio {
  idEspacio?: number
  numeroEspacio: string
  estadoEspacio: string
  tipoEspacio: string
}

export interface Usuario {
  idUsuario?: number
  nombreUsuario: string
  claveUsuario: string
  estadoUsuario: string
  tipoUsuario: string
}

export interface LoginRequest {
  usuario: string
  pasword: string
}

export interface AuthResponse {
  ok: boolean
  message: string
}

export interface Configuration {
  nombreEmpresa: string
  impuesto: string
  moneda: string
  simboloMoneda: string
  direccion: string
  ruc: string
  celular: string
  dimensionX: string
  dimensionY: string
  cantidadCerosBoleta: string
  cantidadCerosFactura: string
}

export interface Caja {
  idCaja: number
  fechaApertura: string
  montoApertura: number
  fechaCierre?: string
  montoCierre?: number
  estado: string
}

export interface CajaResponse {
  success: boolean
  data?: Caja | Caja[]
  message?: string
}

export interface TotalCajasResponse {
  success: boolean
  data?: {
    total: number
    cantidad: number
  }
  message?: string
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Handle empty responses (like DELETE)
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return {} as T
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

export const clienteAPI = {
  listar: (params?: { nombre?: string; apellido?: string; razon?: string }): Promise<Cliente[]> => {
    const searchParams = new URLSearchParams()
    if (params?.nombre) searchParams.append("nombre", params.nombre)
    if (params?.apellido) searchParams.append("apellido", params.apellido)
    if (params?.razon) searchParams.append("razon", params.razon)

    const query = searchParams.toString()
    return apiRequest<Cliente[]>(`/clientes${query ? `?${query}` : ""}`)
  },

  crear: (cliente: Omit<Cliente, "idCliente">): Promise<Cliente> => {
    return apiRequest<Cliente>("/clientes", {
      method: "POST",
      body: JSON.stringify(cliente),
    })
  },

  actualizar: (id: number, cliente: Omit<Cliente, "idCliente">): Promise<Cliente> => {
    return apiRequest<Cliente>(`/clientes/${id}`, {
      method: "PUT",
      body: JSON.stringify(cliente),
    })
  },

  eliminar: (id: number): Promise<void> => {
    return apiRequest<void>(`/clientes/${id}`, {
      method: "DELETE",
    })
  },
}

export const espacioAPI = {
  listar: (estado?: string): Promise<Espacio[]> => {
    const query = estado ? `?estado=${encodeURIComponent(estado)}` : ""
    return apiRequest<Espacio[]>(`/espacios${query}`)
  },

  crear: (espacio: { numeroEspacio: string; estadoEspacio: string; tipoEspacio: string }): Promise<Espacio> => {
    return apiRequest<Espacio>("/espacios", {
      method: "POST",
      body: JSON.stringify(espacio),
    })
  },

  cambiarEstado: (id: number, estado: string): Promise<Espacio> => {
    return apiRequest<Espacio>(`/espacios/${id}/estado`, {
      method: "PATCH",
      body: JSON.stringify({ estadoEspacio: estado }),
    })
  },
}

export const authAPI = {
  login: (credentials: LoginRequest): Promise<AuthResponse> => {
    console.log(credentials)
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  registrarUsuario: (usuario: Omit<Usuario, "idUsuario">): Promise<Usuario> => {
    return apiRequest<Usuario>("/usuarios", {
      method: "POST",
      body: JSON.stringify(usuario),
    })
  },
}

export const cajaAPI = {
  // Listar todas las cajas
  listar: (): Promise<Caja[]> => {
    return apiRequest<Caja[]>("/cajas")
  },

  // Filtrar cajas por rango de fechas
  listarPorRango: (desde: string, hasta: string): Promise<Caja[]> => {
    const searchParams = new URLSearchParams()
    searchParams.append("desde", desde)
    searchParams.append("hasta", hasta)
    return apiRequest<Caja[]>(`/cajas?${searchParams.toString()}`)
  },

  // Abrir caja
  abrir: (caja: { fecha: string; monto: number; estado: string }): Promise<Caja> => {
    return apiRequest<Caja>("/cajas/abrir", {
      method: "POST",
      body: JSON.stringify(caja),
    })
  },

  // Cerrar caja
  cerrar: (id: number): Promise<Caja> => {
    return apiRequest<Caja>(`/cajas/${id}/cerrar`, {
      method: "PATCH",
    })
  },

  // Total de cajas por rango
  totalPorRango: (desde: string, hasta: string): Promise<{ total: number; cantidad: number }> => {
    const searchParams = new URLSearchParams()
    searchParams.append("desde", desde)
    searchParams.append("hasta", hasta)
    return apiRequest<{ total: number; cantidad: number }>(`/cajas/total?${searchParams.toString()}`)
  },
}

export const clienteService = {
  getAll: (): Promise<Cliente[]> => {
    return clienteAPI.listar()
  },

  create: (cliente: {
    nombres: string
    apellidos: string
    razonSocial: string
    ruc: string
    direccion: string
    telefono: string
    correo: string
  }): Promise<Cliente> => {
    return clienteAPI.crear({
      nombreCliente: cliente.nombres,
      apellidoCliente: cliente.apellidos,
      razonSCliente: cliente.razonSocial,
      rucCliente: cliente.ruc,
      direccionCliente: cliente.direccion,
      telefonoCliente: cliente.telefono,
      correoCliente: cliente.correo,
    })
  },

  update: (
    id: number,
    cliente: {
      nombres: string
      apellidos: string
      razonSocial: string
      ruc: string
      direccion: string
      telefono: string
      correo: string
    },
  ): Promise<Cliente> => {
    return clienteAPI.actualizar(id, {
      nombreCliente: cliente.nombres,
      apellidoCliente: cliente.apellidos,
      razonSCliente: cliente.razonSocial,
      rucCliente: cliente.ruc,
      direccionCliente: cliente.direccion,
      telefonoCliente: cliente.telefono,
      correoCliente: cliente.correo,
    })
  },

  delete: (id: number): Promise<void> => {
    return clienteAPI.eliminar(id)
  },
}

export const espacioService = {
  getAll: (): Promise<Espacio[]> => {
    return espacioAPI.listar()
  },

  create: (espacio: { zona: string }): Promise<Espacio> => {
    return espacioAPI.crear({
      numeroEspacio: espacio.zona,
      estadoEspacio: "DISPONIBLE",
      tipoEspacio: "AUTO",
    })
  },

  update: (id: number, espacio: { zona: string }): Promise<Espacio> => {
    return apiRequest<Espacio>(`/espacios/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        numeroEspacio: espacio.zona,
        estadoEspacio: "DISPONIBLE",
        tipoEspacio: "AUTO",
      }),
    })
  },

  delete: (id: number): Promise<void> => {
    return apiRequest<void>(`/espacios/${id}`, {
      method: "DELETE",
    })
  },
}

export const authService = {
  login: (credentials: { usuario: string; password: string }): Promise<AuthResponse> => {
    console.log("Credentials",credentials)
    return authAPI.login({
      usuario: credentials.usuario,
      pasword: credentials.password,
    })
  },

  getAllUsers: (): Promise<Usuario[]> => {
    return apiRequest<Usuario[]>("/usuarios")
  },

  createUser: (usuario: {
    usuario: string
    password: string
    tipo: string
    nombres: string
    apellidos: string
    dni: string
    telefono: string
  }): Promise<Usuario> => {
    return authAPI.registrarUsuario({
      nombreUsuario: usuario.usuario,
      claveUsuario: usuario.password,
      estadoUsuario: "ACTIVO",
      tipoUsuario: usuario.tipo,
    })
  },

  changePassword: (userId: number, newPassword: string): Promise<void> => {
    return apiRequest<void>(`/usuarios/${userId}/password`, {
      method: "PATCH",
      body: JSON.stringify({ claveUsuario: newPassword }),
    })
  },
}

export const configuracionService = {
  getConfiguration: (): Promise<Configuration> => {
    return apiRequest<Configuration>("/configuraciones")
  },

  updateConfiguration: (config: Configuration): Promise<Configuration> => {
    return apiRequest<Configuration>("/configuraciones", {
      method: "PUT",
      body: JSON.stringify(config),
    })
  },
}

export const cajaService = {
  // Obtener todas las cajas
  getAll: async (): Promise<CajaResponse> => {
    try {
      const data = await cajaAPI.listar()
      return { success: true, data }
    } catch (error) {
      console.error("Error getting all cajas:", error)
      return { success: false, message: "Error al obtener las cajas" }
    }
  },

  // Obtener cajas por rango de fechas
  getByDateRange: async (desde: string, hasta: string): Promise<CajaResponse> => {
    try {
      const data = await cajaAPI.listarPorRango(desde, hasta)
      return { success: true, data }
    } catch (error) {
      console.error("Error getting cajas by date range:", error)
      return { success: false, message: "Error al obtener las cajas por rango de fechas" }
    }
  },

  // Abrir caja
  open: async (monto: number): Promise<CajaResponse> => {
    try {
      const today = new Date().toISOString().split("T")[0] // Formato YYYY-MM-DD
      const cajaData = {
        fecha: today,
        monto: monto,
        estado: "abierta",
      }
      const data = await cajaAPI.abrir(cajaData)
      return { success: true, data }
    } catch (error) {
      console.error("Error opening caja:", error)
      return { success: false, message: "Error al abrir la caja" }
    }
  },

  // Cerrar caja
  close: async (id: number): Promise<CajaResponse> => {
    try {
      const data = await cajaAPI.cerrar(id)
      return { success: true, data }
    } catch (error) {
      console.error("Error closing caja:", error)
      return { success: false, message: "Error al cerrar la caja" }
    }
  },

  // Obtener total de cajas por rango
  getTotalByDateRange: async (desde: string, hasta: string): Promise<TotalCajasResponse> => {
    try {
      const data = await cajaAPI.totalPorRango(desde, hasta)
      return { success: true, data }
    } catch (error) {
      console.error("Error getting total cajas by date range:", error)
      return { success: false, message: "Error al obtener el total de cajas" }
    }
  },
}
