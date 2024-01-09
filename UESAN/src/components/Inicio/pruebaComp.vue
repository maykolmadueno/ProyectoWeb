<template>
  <div class="container">
    <h1>Solicitud de Servicio Fotográfico</h1>
    <form @submit.prevent="guardarSolicitud">
      <label for="cantidad">Cantidad de Fotos:</label>
      <input type="number" v-model="cantidad" required>

      <label for="tipo">Tipo:</label>
      <div class="dropdown">
        <button @click="toggleDropdown" class="dropbtn">{{ tipo ? `Tipo: ${tipo}` : 'Seleccionar Tipo' }}</button>
        <div v-show="mostrarDropdown" id="tipoDropdown" class="dropdown-content">
          <!-- Imágenes de los tipos de planos -->
          <img src="https://static-cse.canva.com/blob/984426/12EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.d1bc8777.png" alt="Plano 1" @click="seleccionarTipo('Gran Plano General')">
          <img src="https://static-cse.canva.com/blob/984461/13EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.e22b4811.jpg" alt="Plano 2" @click="seleccionarTipo('Plano General')">
          <img src="https://static-cse.canva.com/blob/984423/14EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.ca3823ef.png" alt="Plano 3" @click="seleccionarTipo('Plano Entero')">
          <img src="https://static-cse.canva.com/blob/984460/15EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.c1ac7cc1.png" alt="Plano 4" @click="seleccionarTipo('Plano Americano')">
          <img src="https://static-cse.canva.com/blob/984459/16EncuadresinfaliblesLos15planosfotogrficosquedebesdominar.b8f5ff7d.png" alt="Plano 5" @click="seleccionarTipo('Plano medio largo')">
        </div>
      </div>

      <label for="persona">Persona Objetivo:</label>
      <input type="text" v-model="persona" required>

      <label for="canales">Canales:</label>
      <input type="text" v-model="canales" required>

      <label for="linkDestino">Link Destino:</label>
      <input type="url" v-model="linkDestino" required>

      <button type="submit">Guardar</button>
    </form>

    <div id="solicitudesGuardadas">
       <div v-for="(solicitud, index) in solicitudes" :key="index" v-pre>
           {{ solicitud }}
       </div>
    </div>

    <button @click="nuevaSolicitud">Nueva Solicitud</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cantidad: '',
      tipo: '',
      persona: '',
      canales: '',
      linkDestino: '',
      mostrarDropdown: false,
      solicitudes: [],
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
    guardarSolicitud() {
      const solicitud = {
        cantidad: this.cantidad,
        tipo: this.tipo,
        persona: this.persona,
        canales: this.canales,
        linkDestino: this.linkDestino,
      };

      this.solicitudes.push(solicitud);
      console.log("Solicitud guardada:", solicitud);

      // Aquí puedes enviar la solicitud a tu API si es necesario

      this.limpiarFormulario();
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
  max-width: 600px;
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
