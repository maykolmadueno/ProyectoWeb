<template>
  <div class="container">
    <h1>Formulario de Evento</h1>
    <form @submit.prevent="crearServicios">

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="nombre" required>
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea v-model="descripcion" required></textarea>
      </div>

      <div class="form-group">
        <label for="fechaEvento">Fecha del Evento:</label>
        <input type="date" v-model="fechaEvento" required>
      </div>

      <div class="form-group">
        <label for="horaInicio">Hora de Inicio:</label>
        <input type="time" v-model="horaInicio" required>
      </div>

      <div class="form-group">
        <label for="horaFin">Hora de Fin:</label>
        <input type="time" v-model="horaFin" required>
      </div>

      <div class="form-group">
        <label for="lugar">Lugar:</label>
        <input type="text" v-model="lugar" required>
      </div>

      <div class="form-group">
        <label for="momentosImportantes">Momentos Importantes:</label>
        <textarea v-model="momentosImportantes"></textarea>
      </div>

      <div class="form-group">
        <label for="cantidadInvitados">Cantidad de Invitados:</label>
        <input type="number" v-model="cantidadInvitados" required>
      </div>

      <button @click="crearServicios">Crear Servicios</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      descripcion: '',
      fechaEvento: '',
      horaInicio: '',
      horaFin: '',
      lugar: '',
      momentosImportantes: '',
      cantidadInvitados: '',
    };
  },
  methods: {
    crearServicios() {
      const evento = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        fechaEvento: new Date(this.fechaEvento).toISOString(),
        horaInicio: this.horaInicio,
        horaFin: this.horaFin,
        lugar: this.lugar,
        momentosImportantes: this.momentosImportantes,
        cantidadInvitados: this.cantidadInvitados,
        idUsuario: 1,
      };

      // Aquí puedes hacer lo que desees con el objeto evento, por ejemplo, enviarlo a la API
      console.log('Evento guardado:', evento);
      //localStorage.setItem("EventoActual", this.evento.data);
      localStorage.setItem("EventoActual", JSON.stringify(evento));
      // Redirige a la página de servicios
      this.$router.push('/services');
      // Limpia el formulario después de guardar
      this.limpiarFormulario();
    },
    limpiarFormulario() {
      this.nombre = '';
      this.descripcion = '';
      this.fechaEvento = '';
      this.horaInicio = '';
      this.horaFin = '';
      this.lugar = '';
      this.momentosImportantes = '';
      this.cantidadInvitados = '';
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
