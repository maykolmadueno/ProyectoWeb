<template>
  <div v-if="!est">
    <h2>Este usuario no tiene eventos</h2>
  </div>
  <div v-if="est" class="main-container">
    <div class="titulo-filtro">
      <div class="link-regresar-container">
        <router-link to="Home">Regresar</router-link>
      </div>
      <div class="titulo-container">
        <h3>Filtros:</h3>
      </div>
      <div class="filtros-container">
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
            <input
              type="date"
              v-model="filtroFechaFin"
              @change="aplicarFiltro"
            />
          </div>
        </div>
        <div class="btn-container">
          <button @click="limpiarFiltros">Limpiar filtros</button>
        </div>
      </div>
      <div class="titulo-dos-container">
        <h3>Eventos:</h3>
      </div>
    </div>

    <!-- Tabla de eventos -->
    <div v-if="est" class="tabla-container">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Propietario</th>
            <th>Estado</th>
            <th></th>
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
              <button @click="verDetalles(evento)">Detalles</button>
              <button @click="eliminarEvento(evento)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- <button @click = "regresar">Regresar</button> -->
</template>

<script>
import axios from "axios";
import HomePage from "src/pages/HomePage.vue";
export default {
  data() {
    return {
      usuario: null,
      eventos: [],
      eventosFiltrados: [],
      filtroEstado: "",
      filtroNombre: "",
      filtroFechaInicio: "",
      filtroFechaFin: "",
      est: true,
    };
  },
  mounted() {
    //Primero traigo al usuario:
    this.usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    this.fetchEventos();
  },

  methods: {
    async fetchEventos() {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Eventos/GetAllByUsuarioVizualizadorAndcreador?id=${this.usuario.idUsuario}`
        );
        this.eventos = response.data;
        console.log(this.eventos);
        this.eventosFiltrados = [...this.eventos];
      } catch (error) {
        this.est = false;
        console.error("Error:", error);
        this.$q.notify({
          message: "Este usuario aun no tiene eventos",
          color: "negative",
          position: "top",
          timeout: 5000,
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

    verDetalles(evento) {
      localStorage.setItem("EventoSeleccionado", JSON.stringify(evento));

      const v = {
        contenido: "usuarioeventos",
      };
      localStorage.setItem("ventanaActual", JSON.stringify(v));
      this.$router.push("/detalleEventoVista");
    },

    regresar() {
      this.$router.push("/Home");
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
  align-items: center;
  justify-content: start;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
  height: 100vh;
  background-image: linear-gradient(black 50%, rgb(82, 25, 25));
  background-repeat: no-repeat;
  background-size: contain;
  backface-visibility: visible;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  z-index: 100;
}

.titulo-filtro {
  position: fixed;
}

.titulo-container {
  margin-top: 0;
  padding: 0;
}
.titulo-container h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0;
}

.filtros-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
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

button {
  width: 100%;
  font-size: 14px;
}
button:hover {
  opacity: 0.8;
}
.link-regresar-container {
  margin-top: 30px;
  text-align: center;
}

div a {
  color: rgb(236, 128, 128);
  cursor: pointer;
  font-size: 20px;
}
div a:hover {
  font-weight: bold;
}
div a:active {
  color: white;
}
.tabla-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-top: 300px;
  overflow-y: auto;
  width: 800px;
  position: relative;
  border: 1px solid white;
  /*  overflow-y: auto; */
}

table {
  width: 100%;
  /* height: 100vh; */
  border-collapse: collapse;
  font-size: 14px;
}
thead,
tbody {
  display: block;
  width: 100%;
}
/* thead {
  position: sticky;
  top: 0;
} */
th,
td {
  /* padding: 8px; */
  text-align: left;
  border-bottom: 1px solid #ddd;
  width: 150px;
}

th {
  background-color: rgb(255, 255, 255);
  color: rgb(119, 15, 15);
  text-align: left;
  /* padding: 5px; */
  /*  width: 250px; */
  position: sticky;
  top: 0;
}

td {
  border: 1px solid #dddddd;
  /* padding: 10px; */
  text-align: left;
}

tr:hover {
  background-color: rgba(223, 112, 112, 0.3);
}

tbody {
  overflow-y: auto;
  max-height: 360px;
}
</style>
