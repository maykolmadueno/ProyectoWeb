<template>
  <div>
    <div>
      <h2>Filtros  </h2>
      <div>
        <label for="estado">Estado:</label>
        <select v-model="filtroEstado" @change="aplicarFiltro">
          <option value="">Todos</option>
          <option value="Abierto">Abierto</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Atendido">Atendido</option>
        </select>
      </div>

      <!-- Filtro por Nombre -->
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="filtroNombre" @input="aplicarFiltro" />
      </div>

      <!-- Filtro por Fecha -->
      <div>
        <label for="fechaInicio">Fecha Inicio:</label>
        <input type="date" v-model="filtroFechaInicio" @change="aplicarFiltro" />
      </div>
      <div>
        <label for="fechaFin">Fecha Fin:</label>
        <input type="date" v-model="filtroFechaFin" @change="aplicarFiltro" />
      </div>

      <button @click="limpiarFiltros">Limpiar filtros</button>

    </div>

    <!-- Tabla de eventos -->
    <div>
      <h2>Eventos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>nombre Propietario</th>
            <th>estado</th>
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
            <button  @click="verDetalles(evento)">Detalles</button>
            <button  @click="eliminarEvento(evento)">Eliminar</button>
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
      usuario:null,
      eventos: [],
      eventosFiltrados: [],
      filtroEstado: '',
      filtroNombre: '',
      filtroFechaInicio: '',
      filtroFechaFin:'',
    };
  },
  mounted() {
    //Primero traigo al usuario:
    this.usuario =JSON.parse(localStorage.getItem("usuarioActual"));
    this.fetchEventos();
  },

  methods: {
    async fetchEventos() {
      try{
        const response = await axios.get(`http://localhost:5158/api/Eventos/GetAllByUsuarioVizualizadorAndcreador?id=${this.usuario.idUsuario}`);
        this.eventos = response.data;
        this.eventosFiltrados = [...this.eventos];
      }catch(error){
        console.error('Error:', error);
        this.$q.notify({
            message: "Error al traer los eventos...",
            color: "negative",
            position: "top",
            timeout: 3000,
          });
      }
    },


  aplicarFiltro() {
    let eventosFiltrados = this.eventos.filter(evento => {
    let cumpleEstado = this.filtroEstado ? evento.estado === this.filtroEstado : true;
    let cumpleNombre = this.filtroNombre ? evento.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) : true;

    let cumpleFecha = true;
    if (this.filtroFechaInicio && this.filtroFechaFin) {
      cumpleFecha = evento.fechaEvento >= this.filtroFechaInicio && evento.fechaEvento <= this.filtroFechaFin;
    }

    return cumpleEstado && cumpleNombre && cumpleFecha;
  });
  this.eventosFiltrados = eventosFiltrados;
  },

  limpiarFiltros() {
    this.filtroEstado = '';
    this.filtroNombre = '';
    this.filtroFechaInicio = '';
    this.filtroFechaFin = '';
    this.eventosFiltrados = this.eventos;
  },


  verDetalles(evento) {
    localStorage.setItem("EventoSeleccionado",JSON.stringify(evento));
    this.$router.push('/detalleEventoVista');
  },

  async eliminarEvento(evento) {
    try{
        const response = await axios.get(`http://localhost:5158/api/Eventos?id=${evento.idEvento}`);
        this.$q.notify({
            message: "Se Eliminó el evento ",
            color: "positive",
            position: "top",
            timeout: 4000,
          });
      }catch(error){
        console.error('Error:', error);
        this.$q.notify({
            message: "No se pudo eliminar el evento...",
            color: "negative",
            position: "top",
            timeout: 3000,
          });
      }
  }

  }
};
</script>

<style scoped>

.btn-circular {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}


</style>
