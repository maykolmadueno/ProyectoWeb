
<template>
  <div class="container">
    <div class="fondo-container">
      <h3>Modificación del elemento seleccionado</h3>

      <!-- Evento -->

      <div class="main-container" v-if="estadoEvento">
      <div class="title-container">Evento</div>
        <div class="inputs-container">
          <div class="name-container">
            <label for="e.nombre">Nombre:</label>
            <input
              type="text"
              v-model="e.nombre"
              required
              placeholder="nombre"
            />
          </div>

          <div class="description-container">
            <label for="e.descripcion">Descripción:</label>
            <textarea
              v-model="e.descripcion"
              required
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div class="date-time-container">


            <div class="start-time-container">
              <label for="e.horaInicio">Hora de Inicio:</label>
              <input type="time" v-model="e.horaInicio" required />
            </div>

            <div class="finish-time-container">
              <label for="e.horaFin">Hora de Fin:</label>
              <input type="time" v-model="e.horaFin" required />
            </div>
          </div>

          <div class="place-container">
            <label for="e.lugar">Lugar:</label>
            <input type="text" v-model="e.lugar" required />
          </div>

          <div class="imp-mom-container">
            <label for="e.momentosImportantes">Momentos Importantes:</label>
            <textarea
              v-model="e.momentosImportantes"
              required
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div class="quantity-container">
            <label for="e.cantidadInvitados">Cantidad de Invitados:</label>
            <input type="number" v-model="e.cantidadInvitados" required />
          </div>
        </div>

      </div>

      <!-- Fotos -->

      <div class="formulario-container" v-if = "estadoFoto">
        <h3>Solicitud de Servicio Fotográfico</h3>
          <!-- Resto del formulario como antes -->

          <div class="cant-fotos-container">
            <label for="cantidad">Cantidad de Fotos:</label>
            <input  v-model="e.cantidadFotos" required />
          </div>

          <div class="tipo-container">
            <label for="tipo">Tipo:</label>
            <div class="dropdown" :class="{ open: mostrarDropdown }">
              <button @click="toggleDropdown" class="dropbtn">
                {{ e.tipoFoto ? `Tipo: ${e.tipoFoto}` : "Seleccionar Tipo" }}
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

          <div class="persona-objetivo-container">
            <label for="persona">Persona Objetivo:</label>
            <input type="text" v-model="e.pesonaObjetivo" required />
          </div>
          <div class="canales-container">
            <label for="canales">Canales:</label>
            <input type="text" v-model="e.canales" required />
          </div>
          <div class="link-destino-container">
            <label for="linkDestino">Link Destino:</label>
            <input type="url" v-model="e.link" required />
          </div>

      </div>

      <!-- Video -->

      <div class="form-wrapper" v-if = "estadoVideo">
        <h3>Solicitud de Servicio de Video</h3>
          <!-- ... (campos del formulario) -->
          <div class="nombre-video-container">
            <label for="nombre">Nombre del Video:</label>
            <input type="text" v-model="e.nombre" required />
          </div>

          <div class="link-video-container">
            <label for="link">Link del Video:</label>
            <input type="url" v-model="e.link" required />
          </div>

          <div class="nombre-objeto-container">
            <label for="nombreObjetivo">Nombre del Objeto:</label>
            <input type="text" v-model="e.nombreObjetivo" required />
          </div>

          <div class="lugar-filmacion-container">
            <label for="lugarFilmacion">Lugar de Filmación:</label>
            <input type="text" v-model="e.lugarFilmacion" required />
          </div>
      </div>


    <button @click="REGRESAR">Regresar</button>
    <button @click="GuardarCambios">Guardar Cambios</button>

  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {

  created() {
    //AQUI TRAIGO EL ELEMENTO SELECCIONADO:
    this.e = JSON.parse(localStorage.getItem("elementoSeleccionado"));
    if(this.e.elemento == "evento") {
      this.estadoEvento = true;
    }
    else if(this.e.elemento == "video") this.estadoVideo = true;
    else if(this.e.elemento == "foto") this.estadoFoto = true;
    console.log("Valor del objeto recibido : " + JSON.stringify(this.e));

  },

  data() {
    return {
      e : null,
      estadoEvento : false,
      estadoFoto : false,
      estadoVideo : false,
      funciones : {
        'evento' : this.updateEvento,
        'foto' : this.updateFoto,
        'video' : this.updateVideo
      }
    };
  },

  methods: {
    REGRESAR(){
      this.$router.push('/detalleEventoVista');
    },

    async GuardarCambios(){
      if(this.e.elemento == "evento") await this.updateEvento();
      else if(this.e.elemento == "video") await this.updateVideo();
      else if(this.e.elemento == "foto") await this.updateFoto();
      this.REGRESAR();
    },

    async updateEvento(){
      const url = "http://localhost:5158/api/Eventos";
      const objeto = {
        idEvento : this.e.idEvento,
        descripcion : this.e.descripcion,
        nombre : this.e.nombre,
        fechaEvento : this.e.fechaEvento,
        horaInicio : this.e.horaInicio,
        horaFin : this.e.horaFin,
        lugar : this.e.lugar,
        fechaCreacion : this.e.fechaCreacion,
        momentosImportantes : this.e.momentosImportantes,
        cantidadInvitados : this.e.cantidadInvitados,
        idUsuario : this.e.usuarioPropietario.idUsuario,
        estado : this.e.estado
      }
      await this.updateGeneral(url,objeto);
    },

    async updateFoto(){
      const url = "http://localhost:5158/api/ServicioFotos";
      const objeto = {
        idServicioFotos : this.e.idServicioFotos,
        idServicio : this.e.idServicio,
        cantidadFotos : this.e.cantidadFotos,
        tipoFoto : this.e.tipoFoto,
        pesonaObjetivo : this.e.pesonaObjetivo,
        canales : this.e.canales,
        link : this.e.link
      }

      await this.updateGeneral(url,objeto);
    },

    async updateVideo(){
      const url = "http://localhost:5158/api/Video";
      const objeto = {
        idVideo : this.e.idVideo,
        fechaSubida : this.e.fechaSubida,
        nombre : this.e.nombre,
        link : this.e.link,
        nombreObjetivo : this.e.nombreObjetivo,
        lugarFilmacion : this.e.lugarFilmacion,
        edicion : this.e.edicion,
        idServicio : this.e.idServicio
      }
      await this.updateGeneral(url,objeto);
    },

    async updateGeneral(url,objeto){
      try {
        const response = await axios.put(url, objeto);
        console.log(response.data);
        if(response && response.data == true){
          this.$q.notify({
            //message: `Error al traer los ${objeto}`,
            message: "La modificación se realizó con éxito",
            color: "positive",
            position: "top",
            timeout: 4000,
          });
        }else{
          this.$q.notify({
            //message: `Error al traer los ${objeto}`,
            message: "Ocurrió un error, o no se cumplieron las condiciones",
            color: "negative",
            position: "top",
            timeout: 4000,
          });
        }

      } catch (error) {
        console.error("Error al actualizar el objeto:", error);
        this.$q.notify({
            //message: `Error al traer los ${objeto}`,
            message: "Ocurrió un error, intentalo mas tarde",
            color: "negative",
            position: "top",
            timeout: 4000,
          });
        throw error;
      }
    }

  },
};
</script>


<style scoped>
  .fondo-container {
  background-image: url("src/assets/fondo-esan-2.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;

  font-family: Arial, Helvetica, sans-serif;
  color: white;
  background-color: rgb(0, 0, 0, 0.8);
  height: 100vh;
  width: 100vw;
}

/* Main container */
.main-container {
  display: flex;
  flex-direction: column;
  width: 600px;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(230, 23, 23, 0.5);
  padding: 20px 40px;
  border-radius: 20px;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.4);
}

.title-container {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
}
.inputs-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 15px;
}
.inputs-container input {
  border: none;
  margin-top: 5px;
  padding-left: 10px;
}
.inputs-container input:focus {
  outline: 2px solid rgb(252, 249, 249);
}
.name-container input,
.place-container input,
.quantity-container input {
  width: 100%;
  height: 25px;
  border-radius: 5px;
}

/* .description-container input{

    width:100%;
    height: 60px;
    border-radius: 10px;
    text-overflow: initial;

} */
.description-container textarea {
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: none;
  margin-top: 5px;
  padding-left: 10px;
  padding-top: 5px;
}
.description-container textarea:focus {
  outline: 2px solid rgb(252, 249, 249);
}
.imp-mom-container textarea {
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: none;
  margin-top: 5px;
  padding-left: 10px;
  padding-top: 5px;
}

.imp-mom-container textarea:focus {
  outline: 2px solid rgb(252, 249, 249);
}
.date-time-container {
  display: flex;
  flex-direction: row;
  column-gap: 20px;
}
.date-time-container input {
  width: 100%;
  height: 25px;
  border-radius: 5px;
}
.btn-container {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
}
.btn-container button {
  color: white;
  background: transparent;
  padding: 10px 30px;
  border: 4px solid white;
  font-weight: bold;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
}
div a {
  color: rgb(236, 128, 128);
  cursor: pointer;
}
div a:hover {
  font-weight: bold;
}
div a:active {
  color: white;
}

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
</style>
