<template>
  <div class="main-container">
    <!-- Filtros -->

    <div class="titulo-container">
      <h3>Filtros :</h3>
    </div>

    <div class="filtros-container">
      <!-- Filtro por Estado -->
      <div class="filtro-estado-container">
        <label for="estado">Estado:</label>
        <select v-model="filtroEstado" @change="aplicarFiltro">
          <option value="">Todos</option>
          <option value="Abierto">Abierto</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Atendido">Atendido</option>
        </select>
      </div>

      <!-- Filtro por Nombre -->
      <div class="filtro-nombre-container">
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="filtroNombre" @input="aplicarFiltro" />
      </div>

      <!-- Filtro por Fecha -->
      <div class="filtro-fecha-container">
        <div class="filtro-fecha-i-container">
          <label for="fechaInicio">Fecha Inicio:</label>
          <input
            type="date"
            v-model="filtroFechaInicio"
            @change="aplicarFiltro"
          />
        </div>
        <div class="filtro-fecha-f-container">
          <label for="fechaFin">Fecha Fin:</label>
          <input type="date" v-model="filtroFechaFin" @change="aplicarFiltro" />
        </div>
      </div>
      <div class="btn-container">
        <button @click="limpiarFiltros">Limpiar filtros</button>
      </div>
    </div>

    <!-- Tabla de eventos -->
    <div class="tabla-container">
      <div class="titulo-dos-container">
        <h3>Eventos:</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Nombre del Propietario</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="evento in eventosFiltrados" :key="evento.idEvento">
            <td>{{ evento.nombre }}</td>
            <td>{{ evento.fechaEvento }}</td>
            <td>{{ evento.lugar }}</td>
            <td>{{ evento.usuarioPropietario.nombre }}</td>
            <td>{{ evento.estado }}</td>
            <td>
              <button @click="cambiarEstado(evento)">Estado</button>
              <button @click="verDetalles(evento)">Detalles</button>
              <button @click="eliminarEvento(evento)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      eventos: [],
      eventosFiltrados: [],
      filtroEstado: "",
      filtroNombre: "",
      filtroFechaInicio: "",
      filtroFechaFin: "",
    };
  },
  mounted() {
    this.fetchEventos();
  },

  methods: {
    async fetchEventos() {
      try {
        const response = await axios.get(
          "http://localhost:5158/api/Eventos/GetAll"
        );
        this.eventos = response.data;
        this.eventosFiltrados = [...this.eventos];
      } catch (error) {
        console.error("Error:", error);
        this.$q.notify({
          message: "Error al traer los eventos...",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
      }
    },

    aplicarFiltro() {
      let eventosFiltrados = this.eventos.filter((evento) => {
        let cumpleEstado = this.filtroEstado
          ? evento.estado === this.filtroEstado
          : true;
        let cumpleNombre = this.filtroNombre
          ? evento.nombre
              .toLowerCase()
              .includes(this.filtroNombre.toLowerCase())
          : true;

        let cumpleFecha = true;
        if (this.filtroFechaInicio && this.filtroFechaFin) {
          cumpleFecha =
            evento.fechaEvento >= this.filtroFechaInicio &&
            evento.fechaEvento <= this.filtroFechaFin;
        }

        return cumpleEstado && cumpleNombre && cumpleFecha;
      });
      this.eventosFiltrados = eventosFiltrados;
    },

    limpiarFiltros() {
      this.filtroEstado = "";
      this.filtroNombre = "";
      this.filtroFechaInicio = "";
      this.filtroFechaFin = "";
      this.eventosFiltrados = this.eventos;
    },

    async cambiarEstado(evento) {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Eventos/CambiarEstadoEvento?id=${evento.idEvento}`
        );
        this.$q.notify({
          message: "Se cambió el estado del evento ",
          color: "positive",
          position: "top",
          timeout: 4000,
        });
      } catch (error) {
        console.error("Error:", error);
        this.$q.notify({
          message: "No se pudo cambiar el estado del evento...",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
      }
    },

    verDetalles(evento) {
      localStorage.setItem("EventoSeleccionado", JSON.stringify(evento));
      this.$router.push("/detalleEventoVista");
    },

    async eliminarEvento(evento) {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Eventos?id=${evento.idEvento}`
        );
        this.$q.notify({
          message: "Se Eliminó el evento ",
          color: "positive",
          position: "top",
          timeout: 4000,
        });
      } catch (error) {
        console.error("Error:", error);
        this.$q.notify({
          message: "No se pudo eliminar el evento...",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
}
h3 {
  margin: 0;
}
.titulo-container h3 {
  margin-bottom: 10px;
}

.filtros-container {
  display: flex;
  flex-direction: row;
  align-items: end;
  width: 100%;
  column-gap: 30px;
}
.filtros-container button {
  height: 35px;
}
select {
  height: 33px;
}
.filtro-fecha-container {
  display: flex;
  flex-direction: row;
  column-gap: 30px;
  justify-content: center;
}
.tabla-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
label {
  /* font-size: 18px; */
}
input {
  /* font-size: 14px; */
}
.filtro-estado-container,
.filtro-nombre-container,
.filtro-fecha-i-container,
.filtro-fecha-f-container {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}
.titulo-dos-container h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}
table {
  width: 100%;
}
th {
  background-color: rgb(255, 255, 255);
  color: rgb(119, 15, 15);
  text-align: center;
  padding: 5px;
}

td {
  border: 1px solid #dddddd;
  padding: 10px;
  text-align: left;
}

/* tr:nth-child(even) {
  background-color: #f2f2f2;
} */

tr:hover {
  background-color: rgba(223, 112, 112, 0.3);
}

button {
  width: 100%;
  font-size: 14px;
}
button:hover {
  opacity: 0.8;
}
</style>
