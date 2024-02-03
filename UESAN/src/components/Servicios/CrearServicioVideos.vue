<template>
  <div class="container">
    <h1>Solicitud de Servicio de Video</h1>

    <div class="content-wrapper">
      <!-- Formulario -->
      <div class="form-wrapper">
        <form @submit.prevent="guardarSolicitud">
          <!-- ... (campos del formulario) -->
         <label for="nombre">Nombre del Video:</label>
         <input type="text" v-model="nombre" required>

         <label for="link">Link del Video:</label>
         <input type="url" v-model="link" required>

        <label for="nombreObjetivo">Nombre del Objeto:</label>
        <input type="text" v-model="nombreObjetivo" required>

        <label for="lugarFilmacion">Lugar de Filmación:</label>
        <input type="text" v-model="lugarFilmacion" required>

        <button type="submit">{{ modifi ? 'Modificar' : 'Guardar' }}</button>
        </form>
      </div>

      <!-- Lista de Solicitudes -->
      <div class="solicitudes-wrapper">
        <div v-if="solicitudes.length > 0">
          <h2>Solicitudes Guardadas</h2>
          <div v-for="(solicitud, index) in solicitudes" :key="index" class="solicitud-item">
            <!-- ... (mostrar detalles de la solicitud) -->
            <div>
          <strong>Solicitud {{ index + 1 }}</strong>
            </div>
            <div>nombre: {{ solicitud.nombre }}</div>
            <div>link: {{ solicitud.link }}</div>
            <div>nombre objetivo : {{ solicitud.nombreObjetivo }}</div>
            <div>Lugar de filmación: {{ solicitud.lugarFilmacion }}</div>

            <div>
              <button @click="modificarSolicitud(index)">Modificar</button>
              <button @click="eliminarSolicitud(index)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button @click="regresarServiciosMenu">Regresar a servicios</button>
  </div>
</template>

<script>
export default {
  created() {
    const solicitudesGuardadas = localStorage.getItem('VideosSolicitados');

  if (solicitudesGuardadas) {
    try {
      // Intentar parsear la cadena JSON y asignarla al array del componente
      this.solicitudes = JSON.parse(solicitudesGuardadas);
      this.limpiarFormulario();
    } catch (error) {
      this.solicitudes = [];
    }
  }
  },
  data() {
    return {
      nombre: '',
      link: '',
      nombreObjetivo: '',
      lugarFilmacion: '',
      solicitudes: [],
      sc: null,
      modifi: false,
      indexSeleccionado: null,
    };
  },

  methods: {
    guardarSolicitud() {
      const solicitud = {
        nombre: this.nombre,
        link: this.link,
        nombreObjetivo: this.nombreObjetivo,
        lugarFilmacion: this.lugarFilmacion,
      };
      if(this.modifi){//Si proviene de un intento de modificacion
          this.solicitudes.splice(this.indexSeleccionado, 1, solicitud);
          this.limpiarFormulario();
          this.modifi = false;
      }else{
      //La meto a un array
      this.solicitudes.push(solicitud);

      //Limpio el formulario para ingresar otro
      this.limpiarFormulario();
      }
    },

    modificarSolicitud(index) {
      this.sc = this.solicitudes[index];
      this.nombre = this.sc.nombre;
      this.link = this.sc.link;
      this.nombreObjetivo = this.sc.nombreObjetivo;
      this.lugarFilmacion = this.sc.lugarFilmacion;

      this.modifi = true;
      this.indexSeleccionado = index;
    },

    eliminarSolicitud(index) {
      this.solicitudes.splice(index, 1);
    },


    limpiarFormulario() {
      this.nombre = '';
      this.link = '';
      this.nombreObjetivo = '';
      this.lugarFilmacion = '';
    },

    regresarServiciosMenu() {
      //Antes de regresar al menu, meto las solicitudes al localstorage. :)
      localStorage.setItem("VideosSolicitados",JSON.stringify(this.solicitudes));
      this.$router.push('/services');
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

.content-wrapper {
  display: flex;
}

.form-wrapper {
  flex: 1;
  padding-right: 20px; /* Espaciado entre el formulario y las solicitudes */
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.solicitudes-wrapper {
  flex: 1;
}

.solicitud-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #555;
  border-radius: 5px;
}

.solicitud-item div {
  margin-top: 10px;
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
