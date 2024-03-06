<template>
    <div class="container">
      <div class="left-right-container">
        <div class="formulario-container">
          <h3>Solicitud de Servicio de Streaming</h3>
          <!-- Formulario -->
          <form @submit.prevent="guardarSolicitud">
            <!-- ... (campos del formulario) -->

            <div class="num-camaras-container">
              <label for="plataforma">Plataforma:</label>
              <input type="text" v-model="plataforma" required />
            </div>

            <div class="num-camaras-container">
              <label for="Cuenta">En qué cuenta:</label>
              <input type="text" v-model="cuenta" required />
            </div>

            <div class="num-camaras-container">
              <label for="Contacto">Contacto para la cuenta:</label>
              <input type="text" v-model="contactoAccesoCuenta" required />
            </div>

            <div class="guardar-container">
              <label for="numCams">Número de cámaras:</label>
              <input type="radio" v-model = "numeroCamaras" value = 1 @click ="borrarSeleccionAngulo()">
              <label for="numCams">1 (Tipo Registro)</label>
              <input type="radio" v-model = "numeroCamaras" value = 2>
              <label for="numCams">2 (Registro + Ángulo)</label>
            </div>

            <div v-if="numeroCamaras == 2" class="angulos-container">
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
          <p>Plataforma de Streaming: {{ solicitudCreada.plataforma }}</p>
          <p>Cuenta: {{ solicitudCreada.cuenta }}</p>
          <p>Contacto para la cuenta: {{ solicitudCreada.contacto }}</p>
          <p>Número de Cámaras: {{ solicitudCreada.numeroCamaras }}</p>
          <p>
            Ángulo Seleccionado:
            {{
              solicitudCreada && solicitudCreada.angulo
                ? solicitudCreada.angulo
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

  //////////
  //SCRIPT//
  //////////

  <script>
  export default {
    created() {
      const solicitudGuardada = localStorage.getItem("StreamSolicitud");

      if (solicitudGuardada) {
        // Parsear la solicitud guardada y asignarla al estado del componente
        this.solicitudCreada = JSON.parse(solicitudGuardada);
        this.mostrarFormulario = false; // Mostrar el formulario con la solicitud cargada
      }
    },

    data() {
      return {
        plataforma: "",
        cuenta: "",
        contactoAccesoCuenta: "",
        angulosDisponibles: [
          { id: 1, nombre: "Ángulo 1", imagen: "url_angulo_1.jpg" },
          { id: 2, nombre: "Ángulo 2", imagen: "url_angulo_2.jpg" },
          { id: 3, nombre: "Ángulo 3", imagen: "url_angulo_3.jpg" },
          { id: 4, nombre: "Ángulo 4", imagen: "url_angulo_4.jpg" },
        ],
        anguloSeleccionado: null,
        numeroCamaras: "",
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
        this.anguloSeleccionado = angulo;
      },
      borrarSeleccionAngulo() {
        this.anguloSeleccionado = null;
      },

      limpiarFormulario() {
        this.plataforma = "";
        this.contactoAccesoCuenta = "";
        this.cuenta = "";
        this.numeroCamaras = "";
        this.numeroAngulos = 1;
        this.angulosSeleccionados = [];
      },

      regresarServiciosMenu() {
        // Verifica si hay una solicitud creada antes de redirigir
        if (this.solicitudCreada) {
          localStorage.setItem(
            "StreamSolicitud",
            JSON.stringify(this.solicitudCreada)
          );
        } else {
          localStorage.removeItem("StreamSolicitud");
        }

        this.$router.push("/services");
      },

      modificarSolicitud() {
        this.modifi = true;
        this.mostrarFormulario = true;

        // Llenar los campos del formulario con la solicitud original
        this.plataforma = this.solicitudCreada.plataforma;
        this.cuenta = this.solicitudCreada.cuenta;
        this.contactoAccesoCuenta = this.solicitudCreada.contacto;
        this.numeroCamaras = this.solicitudCreada.numeroCamaras;
        this.anguloSeleccionado = this.solicitudCreada.angulo;
      },

      guardarSolicitud() {
        const solicitud = {
          plataforma: this.plataforma,
          cuenta: this.cuenta,
          contacto: this.contactoAccesoCuenta,
          numeroCamaras: this.numeroCamaras,
          angulo: this.anguloSeleccionado,
        };
        this.solicitudCreada = solicitud;
        this.mostrarFormulario = false;
        this.modifi = false;
      },
    },
  };
  </script>

  ///////////
  //ESTILOS//
  ///////////

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
