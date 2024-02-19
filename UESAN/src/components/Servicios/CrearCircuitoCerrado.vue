<template>
  <div class="container">
    <div class="left-right-container">
      <div v-if="mostrarFormulario" class="formulario-container">
        <h3>Solicitud de Servicio de Circuito Cerrado</h3>
        <!-- Formulario -->
        <form @submit.prevent="guardarSolicitud">
          <!-- ... (campos del formulario) -->

          <div class="guardar-container">
            <label for="guardar">Guardar:</label>
            <select v-model="guardar" @change="limpiarLink" required>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
          </div>

          <div v-if="guardar === 'Si'" class="link-container">
            <label for="link">Link:</label>
            <input type="url" v-model="link" required />
          </div>

          <div class="num-camaras-container">
            <label for="numeroCamaras">Número de Cámaras:</label>
            <input type="text" v-model="numeroCamaras" required />
          </div>

          <div class="num-angulos-container">
            <label for="numeroAngulos">Número de Ángulos:</label>
            <input type="number" v-model="numeroAngulos" min="1" required />
          </div>

          <div class="angulos-container">
            <div
              v-for="angulo in angulosDisponibles"
              :key="angulo.id"
              @click="seleccionarAngulo(angulo)"
            >
              <img :src="angulo.imagen" :alt="angulo.nombre" />
              <p>{{ angulo.nombre }}</p>
            </div>
          </div>

          <button type="submit">{{ modifi ? "Modificar" : "Guardar" }}</button>
        </form>
      </div>
      <!-- Solicitud Creada o Modificada -->
      <div v-if="solicitudCreada || modifi">
        <h2>{{ modifi ? "Solicitud Modificada" : "Solicitud Creada" }}</h2>
        <p>Nombre para Guardar: {{ solicitudCreada.guardar }}</p>
        <p>Link: {{ solicitudCreada.link }}</p>
        <p>Número de Cámaras: {{ solicitudCreada.numeroCamaras }}</p>
        <p>Número de Ángulos: {{ solicitudCreada.numeroAngulos }}</p>
        <p>
          Ángulos Seleccionados:
          {{
            solicitudCreada && solicitudCreada.angulos
              ? solicitudCreada.angulos.join(", ")
              : "N/A"
          }}
        </p>

        <!-- Botones para eliminar o modificar -->
        <div
          v-if="solicitudCreada || modifi"
          class="modificar-eliminar-container"
        >
          <button @click="eliminarSolicitud">Eliminar</button>
          <button v-if="!modifi" @click="modificarSolicitud">Modificar</button>
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
    const solicitudGuardada = localStorage.getItem("CCSolicitud");

    if (solicitudGuardada) {
      // Parsear la solicitud guardada y asignarla al estado del componente
      this.solicitudCreada = JSON.parse(solicitudGuardada);
      this.mostrarFormulario = false; // Mostrar el formulario con la solicitud cargada
    }
  },

  data() {
    return {
      guardar: "",
      link: "",
      numeroCamaras: "",
      numeroAngulos: 1,
      angulosDisponibles: [
        { id: 1, nombre: "Ángulo 1", imagen: "url_angulo_1.jpg" },
        { id: 2, nombre: "Ángulo 2", imagen: "url_angulo_2.jpg" },
        { id: 3, nombre: "Ángulo 3", imagen: "url_angulo_3.jpg" },
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
      this.guardar = "";
      this.link = "";
      this.numeroCamaras = "";
      this.numeroAngulos = 1;
      this.angulosSeleccionados = [];
    },

    regresarServiciosMenu() {
      // Verifica si hay una solicitud creada antes de redirigir
      if (this.solicitudCreada) {
        localStorage.setItem(
          "CCSolicitud",
          JSON.stringify(this.solicitudCreada)
        );
      } else {
        localStorage.removeItem("CCSolicitud");
      }

      this.$router.push("/services");
    },

    modificarSolicitud() {
      this.modifi = true;
      this.mostrarFormulario = true;

      // Llenar los campos del formulario con la solicitud original
      this.guardar = this.solicitudCreada.guardar;
      this.link = this.solicitudCreada.link;
      this.numeroCamaras = this.solicitudCreada.numeroCamaras;
      this.numeroAngulos = this.solicitudCreada.numeroAngulos;
      this.angulosSeleccionados = this.solicitudCreada.angulos.map(
        (nombreAngulo) => {
          return this.angulosDisponibles.find(
            (angulo) => angulo.nombre === nombreAngulo
          );
        }
      );
    },

    guardarSolicitud() {
      const solicitud = {
        guardar: this.guardar,
        link: this.link,
        numeroCamaras: this.numeroCamaras,
        numeroAngulos: this.numeroAngulos,
        angulos: this.angulosSeleccionados.map((angulo) => angulo.nombre),
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
  /*   max-width: 800px;
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
  background-image: url("src/assets/fondo-servicio-fotografia.jpg");
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
  /* border-bottom: 3px solid rgba(172, 34, 34, 0.5); */
}

/* Left part of the code */
.formulario-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
}

.formulario-container h3 {
  /*  text-align: center; */
  margin: 30px 0px;
}

form {
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  /* padding: 0 40px; */
}

.guardar-container,
.link-container,
.num-camaras-container,
.num-angulos-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-bottom: 5px;
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
.btn-regresar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 0, 0.5);
  height: 100%;
}
/* Right side of the code */
.modificar-eliminar-container {
  display: flex;
  flex-direction: row;
  /*  row-gap: 20px; */
  column-gap: 20px;
}
</style>
