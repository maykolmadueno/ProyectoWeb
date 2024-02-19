<template>
  <div class="container">
    <div class="left-right-container">
      <!-- Parte Izquierda: Formulario -->
      <div class="formulario-container">
        <h3>Solicitud de Servicio Fotográfico</h3>
        <form @submit.prevent="guardarSolicitud">
          <!-- Resto del formulario como antes -->

          <div class="cant-fotos-container">
            <label for="cantidad">Cantidad de Fotos:</label>
            <input type="number" v-model="cantidad" required />
          </div>

          <div class="tipo-container">
            <label for="tipo">Tipo:</label>
            <div class="dropdown" :class="{ open: mostrarDropdown }">
              <button @click="toggleDropdown" class="dropbtn">
                {{ tipo ? `Tipo: ${tipo}` : "Seleccionar Tipo" }}
              </button>
              <div id="tipoDropdown" class="dropdown-content">
                <div class="tipo-grid">
                  <div
                    v-for="(imagen, index) in tiposDePlanos"
                    :key="index"
                    class="tipo-item"
                    @click="seleccionarTipo(`Plano ${index + 1}`)"
                  >
                    <img :src="imagen.src" :alt="imagen.alt" />
                    <div class="tipo-label">Plano {{ index + 1 }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Resto del formulario como antes -->
          <div class="persona-objetivo-container">
            <label for="persona">Persona Objetivo:</label>
            <input type="text" v-model="persona" required />
          </div>
          <div class="canales-container">
            <label for="canales">Canales:</label>
            <input type="text" v-model="canales" required />
          </div>
          <div class="link-destino-container">
            <label for="linkDestino">Link Destino:</label>
            <input type="url" v-model="linkDestino" required />
          </div>

          <button type="submit">Guardar</button>
        </form>
      </div>

      <!-- Parte Derecha: Lista de Solicitudes -->
      <div class="solicitudes" v-if="solicitudes.length > 0">
        <h3>Solicitudes de fotos guardadas</h3>
        <div
          v-for="(solicitud, index) in solicitudes"
          :key="index"
          class="solicitud-item"
        >
          <div>
            <strong>Solicitud {{ index + 1 }}</strong>
          </div>
          <div>Cantidad: {{ solicitud.cantidad }}</div>
          <div>Tipo: {{ solicitud.tipo }}</div>
          <div>Persona Objetivo: {{ solicitud.persona }}</div>
          <div>Canales: {{ solicitud.canales }}</div>
          <div>Link Destino: {{ solicitud.linkDestino }}</div>

          <!-- Opciones para modificar y eliminar -->
          <div class="modificar-eliminar-container">
            <button @click="modificarSolicitud(index)">Modificar</button>
            <button @click="eliminarSolicitud(index)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-regresar-container">
      <button @click="regresarServiciosMenu">
        Guardar y regresar a servicios
      </button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // Recuperar las solicitudes almacenadas en el localStorage al crear el componente
    const solicitudesGuardadas = localStorage.getItem("FotosSolicitadas");

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
      cantidad: "",
      tipo: "",
      persona: "",
      canales: "",
      linkDestino: "",
      solicitudes: [],
      sc: null,
      mostrarDropdown: false,
      modifi: false,
      respuesta: null,
      indexSeleccionado: null,
      tiposDePlanos: [
        {
          src: "https://static-cse.canva.com/blob/984426/12EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.d1bc8777.png",
          alt: "Plano 1",
        },
        {
          src: "https://static-cse.canva.com/blob/984461/13EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.e22b4811.jpg",
          alt: "Plano 2",
        },
        {
          src: "https://static-cse.canva.com/blob/984423/14EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.ca3823ef.png",
          alt: "Plano 3",
        },
        {
          src: "https://static-cse.canva.com/blob/984460/15EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.c1ac7cc1.png",
          alt: "Plano 4",
        },
        {
          src: "https://static-cse.canva.com/blob/984459/16EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.b8f5ff7d.png",
          alt: "Plano 5",
        },
      ],
    };
  },
  methods: {
    modificarSolicitud(index) {
      //Asigno los valores al formulario:

      this.sc = this.solicitudes[index];

      this.cantidad = this.sc.cantidad;
      this.tipo = this.sc.tipo;
      this.persona = this.sc.persona;
      this.canales = this.sc.canales;
      this.linkDestino = this.sc.linkDestino;

      this.modifi = true;
      this.indexSeleccionado = index;
    },

    toggleDropdown() {
      this.mostrarDropdown = !this.mostrarDropdown;
    },
    seleccionarTipo(tipo) {
      this.mostrarDropdown = false;
      this.tipo = tipo;
    },

    regresarServiciosMenu() {
      //Antes de regresar al menu, meto las solicitudes al localstorage. :)
      localStorage.setItem(
        "FotosSolicitadas",
        JSON.stringify(this.solicitudes)
      );
      this.$router.push("/services");
    },

    eliminarSolicitud(index) {
      this.solicitudes.splice(index, 1);
    },

    guardarSolicitud() {
      //Falta considerar si regresó, por si quiere hacer modificaciones.

      //Primero creo la solicitud de  los campos
      const solicitud = {
        cantidad: this.cantidad,
        tipo: this.tipo,
        persona: this.persona,
        canales: this.canales,
        linkDestino: this.linkDestino,
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

    limpiarFormulario() {
      this.cantidad = "";
      this.tipo = "";
      this.persona = "";
      this.canales = "";
      this.linkDestino = "";
    },
  },
};
</script>

<style scoped>
.container {
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

.cant-fotos-container,
.tipo-container,
.persona-objetivo-container,
.canales-container,
.link-destino-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-bottom: 5px;
}
.tipo-container {
  margin-right: 70px;
}
input {
  border-radius: 10px;
  border: none;
  padding-left: 10px;
}
input:focus {
  outline: 2px solid white;
}

.dropdown.open .dropdown-content {
  display: block;
}

.dropdown-content {
  background-color: #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.tipo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.tipo-item {
  position: relative;
  cursor: pointer;
}

.tipo-item img {
  width: 100%;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;
}

.tipo-item:hover img {
  transform: scale(1.1);
}

.tipo-label {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: white;
  text-align: center;
}

label,
input {
  margin: 5px 0;
}

button {
  padding: 10px;
  margin-top: 5px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #c9302c;
}
.solicitudes h3 {
  margin-top: 30px;
  margin-bottom: 10px;
}
.solicitud-item {
  margin-bottom: 0px;
  padding: 10px;
  /* background-color: #555; */
  border-radius: 5px;
}

#solicitudesGuardadas {
  margin-top: 30px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  padding: 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.dropdown-content img {
  width: 100%;
  cursor: pointer;
}

.dropdown:hover .dropdown-content {
  display: block;
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
  /* row-gap: 20px; */
  column-gap: 20px;
}
</style>
