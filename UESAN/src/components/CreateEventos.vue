<template>
  <div class="container">
    <h1>Formulario de Evento</h1>
    <form @submit.prevent="crearServicios">

      <div class="form-group">
        <label for="e.nombre">Nombre:</label>
        <input type="text" v-model="e.nombre" required>
      </div>

      <div class="form-group">
        <label for="e.descripcion">Descripción:</label>
        <textarea v-model="e.descripcion" required></textarea>
      </div>

      <div class="form-group">
        <label for="e.fechaEvento">Fecha del Evento:</label>
        <input type="date" v-model="e.fechaEvento" required>
      </div>

      <div class="form-group">
        <label for="e.horaInicio">Hora de Inicio:</label>
        <input type="time" v-model="e.horaInicio" required>
      </div>

      <div class="form-group">
        <label for="e.horaFin">Hora de Fin:</label>
        <input type="time" v-model="e.horaFin" required>
      </div>

      <div class="form-group">
        <label for="e.lugar">Lugar:</label>
        <input type="text" v-model="e.lugar" required>
      </div>

      <div class="form-group">
        <label for="e.momentosImportantes">Momentos Importantes:</label>
        <textarea v-model="e.momentosImportantes"></textarea>
      </div>

      <div class="form-group">
        <label for="e.cantidadInvitados">Cantidad de Invitados:</label>
        <input type="number" v-model="e.cantidadInvitados" required>
      </div>

      <button @click="crearServicios">Crear Servicios</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {

  created(){
    const solicitudGuardada = localStorage.getItem("EventoCreado");
    if (solicitudGuardada) {
      // Parsear la solicitud guardada y asignarla al estado del componente
      const e = JSON.parse(solicitudGuardada);
      this.nombre = e.nombre;
      this.descripcion = e.descripcion;
      this.fechaEvento = e.fechaEvento;
      this.horaInicio = e.horaInicio;
      this.horaFin = e.horaFin;
      this.lugar = e.lugar;
      this.momentosImportantes = e.momentosImportantes;
      this.cantidadInvitados = e.cantidadInvitados;
    }
  },

  data() {
    return {
      e : {
        nombre: '',
        descripcion: '',
        fechaEvento: '',
        horaInicio: '',
        horaFin: '',
        lugar: '',
        momentosImportantes: '',
        cantidadInvitados: 0,
      }

    };
  },
  methods: {
    crearServicios() {

      const EventoInsertDTO = {
        nombre: this.e.nombre,
        descripcion: this.e.descripcion,
        fechaEvento: new Date(this.e.fechaEvento).toISOString(),
        horaInicio: this.e.horaInicio,
        horaFin: this.e.horaFin,
        lugar: this.e.lugar,
        fechaCreacion:  new Date().toISOString(),
        momentosImportantes: this.e.momentosImportantes,
        cantidadInvitados: Number(this.e.cantidadInvitados),
        idUsuario: 1
      };

      localStorage.setItem("EventoCreado",JSON.stringify(EventoInsertDTO));

     /*
      const url = "http://localhost:5158/api/Eventos/CreateEventos";
      axios
        .post(url,EventoInsertDTO)
        .then((response) => {
          console.log("La respuesta es:  "+ response.data);
          localStorage.setItem("EventoCreado", response.data);

        })
        .catch((error) => {
          console.log("Ocurrió un error " + error);
          this.$q.notify({
            message: "Ocurrió un error",
            color: "negative",
            position: "top",
            timeout: 3000,
          });
        });
    */
      //localStorage.setItem("EventoActual", this.evento.data);
      //localStorage.setItem("EventoActual", JSON.stringify(evento));
      // Redirige a la página de servicios
      this.limpiarFormulario();
      this.$router.push('/services');
    },
    limpiarFormulario() {
      this.e.nombre = '';
      this.e.descripcion = '';
      this.e.fechaEvento = '';
      this.e.horaInicio = '';
      this.e.horaFin = '';
      this.e.lugar = '';
      this.e.momentosImportantes = '';
      this.e.cantidadInvitados = 0;
    },
  },
};
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #000;
  border-radius: 10px;
  text-align: center;
  color: #fff;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin: 10px 0;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
}

button {
  padding: 10px;
  margin-top: 20px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ccc;
}
</style>
