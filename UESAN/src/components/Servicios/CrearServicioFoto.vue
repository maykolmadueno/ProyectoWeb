<template>
  <div class="container">
    <!-- Parte Izquierda: Formulario -->
    <div class="formulario">
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
    </div>

    <!-- Parte Derecha: Lista de Solicitudes -->
    <div class="solicitudes" v-if="solicitudes.length > 0">
      <h2>Solicitudes Guardadas</h2>
      <div v-for="(solicitud, index) in solicitudes" :key="index" class="solicitud-item">
        <div>
          <strong>Solicitud {{ index + 1 }}</strong>
        </div>
        <div>Cantidad: {{ solicitud.cantidad }}</div>
        <div>Tipo: {{ solicitud.tipo }}</div>
        <div>Persona Objetivo: {{ solicitud.persona }}</div>
        <div>Canales: {{ solicitud.canales }}</div>
        <div>Link Destino: {{ solicitud.linkDestino }}</div>

        <!-- Opciones para modificar y eliminar -->
        <div>
          <button @click="modificarSolicitud(index)">Modificar</button>
          <button @click="eliminarSolicitud(index)">Eliminar</button>
        </div>
      </div>
    </div>

    <button @click="regresarServiciosMenu">Guardar y regresar a servicios</button>
  </div>
</template>

<script>

export default {

  created() {
    // Recuperar las solicitudes almacenadas en el localStorage al crear el componente
  const solicitudesGuardadas = localStorage.getItem('FotosSolicitadas');

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
      cantidad: '',
      tipo: '',
      persona: '',
      canales: '',
      linkDestino: '',
      solicitudes : [],
      sc : null,
      mostrarDropdown: false,
      modifi : false,
      respuesta : null,
      indexSeleccionado : null,
      tiposDePlanos: [
        { src: "https://static-cse.canva.com/blob/984426/12EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.d1bc8777.png", alt: "Plano 1" },
        { src: "https://static-cse.canva.com/blob/984461/13EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.e22b4811.jpg", alt: "Plano 2" },
        { src: "https://static-cse.canva.com/blob/984423/14EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.ca3823ef.png", alt: "Plano 3" },
        { src: "https://static-cse.canva.com/blob/984460/15EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.c1ac7cc1.png", alt: "Plano 4" },
        { src: "https://static-cse.canva.com/blob/984459/16EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.b8f5ff7d.png", alt: "Plano 5" },

      ],
    };
  },
  methods: {

    modificarSolicitud(index){
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

    regresarServiciosMenu(){
      //Antes de regresar al menu, meto las solicitudes al localstorage. :)
      localStorage.setItem("FotosSolicitadas",JSON.stringify(this.solicitudes));
      this.$router.push('/services');
    },

    eliminarSolicitud(index){
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
