<template>
  <div class="container">
    <div class="left-right-container">
      <!-- Parte Izquierda: Formulario -->
      <div class="form-wrapper">
        <h3>Solicitud de Servicio de Video</h3>
        <form @submit.prevent="guardarSolicitud">
          <!-- ... (campos del formulario) -->
          <div class="nombre-video-container">
            <label for="nombre">Nombre del Video:</label>
            <input type="text" v-model="nombre" required />
          </div>

          <div class="link-video-container">
            <label for="link">Link del Video:</label>
            <input type="url" v-model="link" required />
          </div>

          <div class="nombre-objeto-container">
            <label for="nombreObjetivo">Nombre del Objeto:</label>
            <input type="text" v-model="nombreObjetivo" required />
          </div>

          <div class="lugar-filmacion-container">
            <label for="lugarFilmacion">Lugar de Filmación:</label>
            <input type="text" v-model="lugarFilmacion" required />
          </div>

          <button type="submit">{{ modifi ? "Modificar" : "Guardar" }}</button>
        </form>
      </div>

      <!-- Lista de Solicitudes -->
      <div class="solicitudes-wrapper">
        <div v-if="solicitudes.length > 0">
          <h3>Solicitudes Guardadas</h3>
          <div
            v-for="(solicitud, index) in solicitudes"
            :key="index"
            class="solicitud-item"
          >
            <!-- ... (mostrar detalles de la solicitud) -->
            <div>
              <strong>Solicitud {{ index + 1 }}</strong>
            </div>
            <div>nombre: {{ solicitud.nombre }}</div>
            <div>link: {{ solicitud.link }}</div>
            <div>nombre objetivo : {{ solicitud.nombreObjetivo }}</div>
            <div>Lugar de filmación: {{ solicitud.lugarFilmacion }}</div>

            <div class="modificar-eliminar-container">
              <button @click="modificarSolicitud(index)">Modificar</button>
              <button @click="eliminarSolicitud(index)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-regresar-container">
      <button @click="regresarServiciosMenu">Regresar a servicios</button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const solicitudesGuardadas = localStorage.getItem("VideosSolicitados");

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
      nombre: "",
      link: "",
      nombreObjetivo: "",
      lugarFilmacion: "",
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
      if (this.modifi) {
        //Si proviene de un intento de modificacion
        this.solicitudes.splice(this.indexSeleccionado, 1, solicitud);
        this.limpiarFormulario();
        this.modifi = false;
      } else {
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
      this.nombre = "";
      this.link = "";
      this.nombreObjetivo = "";
      this.lugarFilmacion = "";
    },

    regresarServiciosMenu() {
      //Antes de regresar al menu, meto las solicitudes al localstorage. :)
      localStorage.setItem(
        "VideosSolicitados",
        JSON.stringify(this.solicitudes)
      );
      this.$router.push("/services");
    },
  },
};
</script>

<style scoped>
.container {
  /*  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  text-align: center;
  color: white; */

  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-image: url("src/assets/fondo-servicio-video.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: white;
  font-size: 17px;
  font-family: Arial, Helvetica, sans-serif;
}

.left-right-container {
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-around;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
}
.form-wrapper h3 {
  margin: 30px 0px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nombre-video-container,
.link-video-container,
.nombre-objeto-container,
.lugar-filmacion-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-bottom: 5px;
}

input {
  border-radius: 10px;
  border: none;
  padding-left: 10px;
}

input:focus {
  outline: 2px solid white;
}
/* .solicitudes-wrapper {
  margin-bottom: 0;
  border: 2px solid green;
  display: flex;
  vertical-align: top;
} */
.solicitudes-wrapper h3 {
  margin-top: 30px;
  margin-bottom: 0;
}
.solicitud-item {
  margin-bottom: 0px;
  padding: 10px;
  /* background-color: #555; */
  border-radius: 5px;
}

.solicitud-item div {
  margin-top: 10px;
}
label,
input {
  margin: 5px 0;
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

.btn-regresar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 0, 0.5);
  height: 100%;
}

.modificar-eliminar-container {
  display: flex;
  flex-direction: row;
  column-gap: 20px;
}
</style>
