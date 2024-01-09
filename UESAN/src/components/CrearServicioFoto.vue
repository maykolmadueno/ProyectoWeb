<template>
  <div class="container">
    <h1>Solicitud de Servicio Fotográfico</h1>
    <form @submit.prevent="guardarSolicitud">
      <!-- Resto del formulario como antes -->
      <label for="cantidad">Cantidad de Fotos:</label>
      <input type="number" v-model="cantidad" required>

      <label for="tipo">Tipo:</label>
      <div class="dropdown" :class="{ 'open': mostrarDropdown }">
        <button @click="toggleDropdown" class="dropbtn">{{ tipo ? `Tipo: ${tipo}` : 'Seleccionar Tipo' }}</button>
        <div id="tipoDropdown" class="dropdown-content">
          <div class="tipo-grid">
            <div v-for="(imagen, index) in tiposDePlanos" :key="index" class="tipo-item" @click="seleccionarTipo(`Plano ${index + 1}`)">
              <img :src="imagen.src" :alt="imagen.alt">
              <div class="tipo-label">Plano {{ index + 1 }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resto del formulario como antes -->
      <label for="persona">Persona Objetivo:</label>
      <input type="text" v-model="persona" required>

      <label for="canales">Canales:</label>
      <input type="text" v-model="canales" required>

      <label for="linkDestino">Link Destino:</label>
      <input type="url" v-model="linkDestino" required>

      <button type="submit">Guardar</button>
    </form>

    <!-- Resto del contenido como antes -->
    <div id="solicitudesGuardadas">
       <div v-for="(solicitud, index) in solicitudes" :key="index" v-pre>
           {{ solicitud }}
       </div>
    </div>

    <button @click="nuevaSolicitud">Nueva Solicitud</button>
    <button @click="regresarServiciosMenu">Regresar a servicios</button>
  </div>
</template>

<script>
import { data } from "autoprefixer";
import axios from "axios";
export default {
  data() {
    return {
      // ... (datos existentes)
      mostrarDropdown: false,
      idEvent  : null,
      respuesta : null,
      idService : null,
      tiposDePlanos: [
        { src: "https://static-cse.canva.com/blob/984426/12EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.d1bc8777.png", alt: "Plano 1" },
        { src: "https://static-cse.canva.com/blob/984461/13EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.e22b4811.jpg", alt: "Plano 2" },
        { src: "https://static-cse.canva.com/blob/984423/14EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.ca3823ef.png", alt: "Plano 3" },
        { src: "https://static-cse.canva.com/blob/984460/15EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.c1ac7cc1.png", alt: "Plano 4" },
        { src: "https://static-cse.canva.com/blob/984459/16EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.b8f5ff7d.png", alt: "Plano 5" },
        // Agrega más imágenes según sea necesario
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.mostrarDropdown = !this.mostrarDropdown;
    },
    seleccionarTipo(tipo) {
      this.mostrarDropdown = false;
      this.tipo = tipo;
    },

    regresarServiciosMenu(){
      this.$router.push('/services');
    },

    guardarSolicitud() {
        const solicitud = {
        cantidad: this.cantidad,
        tipo: this.tipo,
        persona: this.persona,
        canales: this.canales,
        linkDestino: this.linkDestino,
      };

      console.log("Solicitud guardada:", solicitud);

      // Aquí puedes enviar la solicitud a tu API si es necesario

      //this.limpiarFormulario();
      this.getEvento(solicitud);
    },

    getEvento(solicitud) {
      const eventoC = localStorage.getItem("EventoActual");
      //VALIDAR TODOS LOS ESPACIOS
     /* if (this.checkEmptyFields()) {
        this.$q.notify({
          message: "Por favor, complete   todos los campos.",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
        return;
      }*/
      //CREAR EL EVENTO
      const url = "http://localhost:5158/api/Eventos/CreateEventos";
      console.log("Datos del evento extraido del local estorage : " + JSON.stringify(eventoC.data));
      axios
        .post(url,JSON.stringify(eventoC.data))
        .then((response) => {
          console.log("Aquí va la respuesta " + JSON.stringify(response));
          //localStorage.setItem("postulanteCreado", response.data);
          console.log("SE CREÓ  EL EVENTO : " +  response.data);
          this.idEvent = response;
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

        //Ya se tiene el idEvento
        //Se crea el serivcio :
        const urlS = "http://localhost:5158/api/Servicio/CreateServicio";

        const servicio = {
          idEvento: this.idEvent,
          nombre : "foto",
          tipo : "fotos",
        };

        axios
        .post(urlS,servicio)
        .then((response) => {
          console.log("Aquí va la respuesta de servicios" + JSON.stringify(response.data));
          //localStorage.setItem("postulanteCreado", response.data);
          console.log(response.data);
          this.idService = response.data;
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

        //Crear servicioFotos:
        const urlF = "http://localhost:5158/api/ServicioFotos/CreateServicioFotos";
        const sf = {
            idServicio : this.idService,
            CantidadFotos : solicitud.cantidad,
            tipoFoto : solicitud.tipo,
            personaObjetivo : solicitud.persona,
            canales : solicitud.canales,
            link : solicitud.linkDestino
        };

        axios
        .post(urlF, sf)
        .then((response) => {
          console.log("Aquí va la respuesta servicioFotos " + JSON.stringify(response.data));
          console.log(response.data);
          this.respuesta = response.data;
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

        this.$router.push('/services');

      return null;
    },

    nuevaSolicitud() {
      this.limpiarFormulario();
    },

    limpiarFormulario() {
      this.cantidad = '';
      this.tipo = '';
      this.persona = '';
      this.canales = '';
      this.linkDestino = '';
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
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;
}

.dropdown.open .dropdown-content {
  display: block;
}

.dropdown-content {
  background-color: #333;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border-radius: 5px;
  overflow: hidden;
}

.tipo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
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

.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  text-align: center;
}



label, input {
  margin: 10px 0;
}

button {
  padding: 10px;
  margin-top: 20px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #c9302c;
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
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
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

</style>
