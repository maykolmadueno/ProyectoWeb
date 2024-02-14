<template>
  <div class="container">
    <h1>Solicitud de Servicio de Circuito Cerrado</h1>

    <div v-if="mostrarFormulario">
      <!-- Formulario -->
      <form @submit.prevent="guardarSolicitud">
        <!-- ... (campos del formulario) -->
        <label for="guardar">Guardar:</label>
        <select v-model="guardar" @change="limpiarLink" required>
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>

        <div v-if="guardar === 'Si'">
          <label for="link">Link:</label>
          <input type="url" v-model="link" required>
        </div>

        <label for="numeroCamaras">Número de Cámaras:</label>
        <input type="text" v-model="numeroCamaras" required>

        <label for="numeroAngulos">Número de Ángulos:</label>
        <input type="number" v-model="numeroAngulos" min="1" required>

        <div class="angulos-container">
          <div v-for="angulo in angulosDisponibles" :key="angulo.id" @click="seleccionarAngulo(angulo)">
            <img :src="angulo.imagen" :alt="angulo.nombre">
            <p>{{ angulo.nombre }}</p>
          </div>
        </div>

        <button type="submit">{{ modifi ? 'Modificar' : 'Guardar' }}</button>
      </form>
    </div>

    <!-- Solicitud Creada o Modificada -->
    <div v-if="solicitudCreada || modifi">
      <h2>{{ modifi ? 'Solicitud Modificada' : 'Solicitud Creada' }}</h2>
      <p>Nombre para Guardar: {{ solicitudCreada.guardar }}</p>
      <p>Link: {{ solicitudCreada.link }}</p>
      <p>Número de Cámaras: {{ solicitudCreada.numeroCamaras }}</p>
      <p>Número de Ángulos: {{ solicitudCreada.numeroAngulos }}</p>
      <p>Ángulos Seleccionados: {{ solicitudCreada && solicitudCreada.angulos ? solicitudCreada.angulos.join(', ') : 'N/A' }}</p>


      <!-- Botones para eliminar o modificar -->
      <div v-if="solicitudCreada || modifi">
        <button @click="eliminarSolicitud">Eliminar</button>
        <button v-if = !modifi @click="modificarSolicitud">Modificar</button>
      </div>
    </div>

    <button @click="regresarServiciosMenu">Regresar a servicios</button>

  </div>
</template>

<script>
export default {

  created() {

    const solicitudGuardada = localStorage.getItem("CCSolicitud");

    if (solicitudGuardada) {
      // Parsear la solicitud guardada y asignarla al estado del componente
      this.solicitudCreada = JSON.parse(solicitudGuardada);
      this.mostrarFormulario = false; // Mostrar el formulario con la solicitud cargada

    }
  },

  data() {
    return {

      guardar: '',
      link: '',
      numeroCamaras: '',
      numeroAngulos: 1,
      angulosDisponibles: [
        { id: 1, nombre: 'Ángulo 1', imagen: 'url_angulo_1.jpg' },
        { id: 2, nombre: 'Ángulo 2', imagen: 'url_angulo_2.jpg' },
        { id: 3, nombre: 'Ángulo 3', imagen: 'url_angulo_3.jpg' },

      ],
      angulosSeleccionados: [],
      mostrarFormulario: true,
      solicitudCreada: null,
      modifi: false,
    };
  },

  methods: {

    eliminarSolicitud() {

      this.limpiarFormulario();
      this.solicitudCreada = null;
      this.modifi = false;
      this.mostrarFormulario = true;
    },
    seleccionarAngulo(angulo) {
      if (this.angulosSeleccionados.length < this.numeroAngulos) {
        this.angulosSeleccionados.push(angulo);
      }
    },

    limpiarFormulario() {
      this.guardar = '';
      this.link = '';
      this.numeroCamaras = '';
      this.numeroAngulos = 1;
      this.angulosSeleccionados = [];
    },

    regresarServiciosMenu() {
      // Verifica si hay una solicitud creada antes de redirigir
      if (this.solicitudCreada) {
        localStorage.setItem("CCSolicitud", JSON.stringify(this.solicitudCreada));
      } else {
        localStorage.removeItem("CCSolicitud");
      }

      this.$router.push('/services');
    },

    modificarSolicitud() {
      this.modifi = true;
      this.mostrarFormulario = true;

      // Llenar los campos del formulario con la solicitud original
      this.guardar = this.solicitudCreada.guardar;
      this.link = this.solicitudCreada.link;
      this.numeroCamaras = this.solicitudCreada.numeroCamaras;
      this.numeroAngulos = this.solicitudCreada.numeroAngulos;
      this.angulosSeleccionados = this.solicitudCreada.angulos.map(nombreAngulo => {
        return this.angulosDisponibles.find(angulo => angulo.nombre === nombreAngulo);
      });
    },

    guardarSolicitud() {
      const solicitud = {
        guardar: this.guardar,
        link: this.link,
        numeroCamaras: this.numeroCamaras,
        numeroAngulos: this.numeroAngulos,
        angulos: this.angulosSeleccionados.map(angulo => angulo.nombre),
      };
      this.solicitudCreada = solicitud;
      this.mostrarFormulario = false;
      this.modifi = false;
    },

  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  text-align: center;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.angulos-container {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.angulos-container img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;
}

.angulos-container img:hover {
  transform: scale(1.1);
}

button {
  padding: 10px;
  margin-top: 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #c9302c;
}
</style>
