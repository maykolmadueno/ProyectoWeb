
<template>
  <div class="container">
    <h1>Servicios Consumidos</h1>


    <!-- Evento Creado -->
    <div>
      <h2>Datos del Evento</h2>
      <p>Nombre: {{ Evento.nombre }}</p>
      <p>Descripción: {{ Evento.descripcion  }}</p>
      <p>Fecha de Evento: {{ Evento.fechaEvento }}</p>
      <p>Hora de inicio: {{ Evento.horaInicio }}</p>
      <p>Hora de termino: {{ Evento.horaFin }}</p>
      <p>Lugar: {{ Evento.lugar }}</p>
      <p>Momentos importante: {{ Evento.momentosImportantes }}</p>
      <p>Cantidad de invitados: {{ Evento.cantidadInvitados }}</p>
      <button v-if = "mod" @click ="modificar(Evento,'evento')">Modificar elemento</button>
    </div>

    <!-- Fotos -->

    <div class="fotos" v-if="fotos.length > 0">
      <h2>Solicitudes de fotos guardadas</h2>
      <div v-for="(foto, index) in fotos" :key="index" class="solicitud-item">
        <div>
          <strong>Solicitud {{ index + 1 }}</strong>
        </div>
        <div>Cantidad: {{ foto.cantidadFotos }}</div>
        <div>Tipo: {{ foto.tipoFoto }}</div>
        <div>Persona Objetivo: {{ foto.pesonaObjetivo }}</div>
        <div>Canales: {{ foto.canales }}</div>
        <div>Link Destino: {{ foto.link }}</div>
        <button v-if = "mod" @click ="modificar(foto,'foto')">Modificar elemento</button>
      </div>
    </div>

    <!-- Videos -->


    <div class="videos-wrapper">
        <div v-if="videos.length > 0">
          <h2>Solicitudes de Videos  guardadas</h2>
          <div v-for="(video, index) in videos" :key="index" class="solicitud-item">
            <!-- ... (mostrar detalles de la solicitud) -->
            <div>
          <strong>Solicitud {{ index + 1 }}</strong>
            </div>
            <div>nombre: {{ video.nombre }}</div>
            <div>link: {{ video.link }}</div>
            <div>nombre objetivo : {{ video.nombreObjetivo }}</div>
            <div>Lugar de filmación: {{ video.lugarFilmacion }}</div>
            <button v-if = "mod" @click ="modificar(video,'video')">Modificar elemento</button>
          </div>
        </div>
    </div>

    <div v-if="cc">
      <h2>Solicitud de circuito cerrado</h2>
      <p>Guardar: {{ cc.guardar }}</p>
      <p>Link: {{ cc.link }}</p>
      <p>Número de Cámaras: {{ cc.numeroCamaras }}</p>
      <p>Número de Ángulos: {{ cc.numeroAngulos }}</p>
      <p>Ángulos Seleccionados: {{ cc.angulos }}</p>
    </div>
    <button @click="regresarServiciosMenu">Regresar</button>
  </div>
</template>


<script>
import axios from "axios";
import { stringify } from "postcss";
export default {

  async created() {
    this.GetEvento();
    const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    //Traigo el token:
    this.token = usuario.token;

    if(usuario.idUsuario == this.Evento.usuarioPropietario.idUsuario){
      this.mod = true;
    }
    this.servicios = await this.getservicios();
    //console.log("El valor de la variable servicios en el created : "+ (this.servicios));
    if(this.servicios != null){
        //Primero evaluo cuantos son de foto.
      let idServicioFoto = this.buscador('foto');
      if(idServicioFoto != null){
        this.fotos = await this.getFotos(idServicioFoto);//revisar
        //console.log("Datos de foto : " + JSON.stringify(this.fotos));
      }
      let idServicioVideo = this.buscador('video');
      if(idServicioVideo != null){
        this.videos = await this.getVideos(idServicioVideo);
      }

      let idServicioCC = this.buscador('CircuitoCerrado');
      if(idServicioCC != null){
        this.cc = await this.getCircuitoCerrado(idServicioCC);
      }
    }else{
      console.log("arroz");
    }


  },

  data() {
    return {
      Evento : null,
      fotos : [],
      videos: [],
      cc : null,
      servicios:[],
      mod : false,
      token : ''
    };
  },

  methods: {
    regresarServiciosMenu(){
      const ventanaAnteriorString = localStorage.getItem("ventanaActual");
      const ventanaAnterior = JSON.parse(ventanaAnteriorString);
      if (ventanaAnterior && ventanaAnterior.contenido) {
        console.log("Ventana Anterior: " + ventanaAnterior.contenido);
        if (ventanaAnterior.contenido === "adminP") {
          this.$router.push('/AdminPrincipal');
        } else if (ventanaAnterior.contenido === "usuarioeventos") {
          this.$router.push('/VistaEventosUsuario');
        }
      } else {
        console.error("Error al obtener la ventana anterior del localStorage");
      }
    },

    GetEvento(){
      this.Evento = JSON.parse(localStorage.getItem('EventoSeleccionado'));
    },

    async getFotos(idServicioFoto){
      return await this.funcionGet(`http://localhost:5158/api/ServicioFotos/GetAllByIdServicio${idServicioFoto}`,'Fotos')
    },

    async getVideos(idServicioVideo){
      return await this.funcionGet(`http://localhost:5158/api/Video/GetByIdServicio${idServicioVideo}/servicio`,'Videos');
    },

    async getCircuitoCerrado(idServicioCC){
       return await this.funcionGet(`http://localhost:5158/api/CircuitoCerrado/GetByIdServicio = ${idServicioCC}/Servicio`,'CircuitoCerrado');
    },

    async getservicios(){
      return await this.funcionGet(`http://localhost:5158/api/Servicio/GetAllByIdEvento${this.Evento.idEvento}`,'servicios');
    },

    buscador(tipoBuscado){
      let objetoTipoFoto =  this.servicios.find(objeto => objeto.tipo.trim() === tipoBuscado);
      return objetoTipoFoto ? objetoTipoFoto.idServicios : null;
    },

    async funcionGet(url,objeto){
      try{
        const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
        return (response.data);
      }catch(error){
        //console.error('Error:', error);
        this.$q.notify({
            //message: `Error al traer los ${objeto}`,
            message: `Error : ${error.response.data}`,
            color: "negative",
            position: "top",
            timeout: 4000,
          });
        return null;
      }
    },

    modificar(objeto,nombre){
      const nuevoObjeto = {...objeto}
      nuevoObjeto.elemento = nombre;
      console.log("Nuevo objeto foto : " + nuevoObjeto);
      localStorage.setItem("elementoSeleccionado",JSON.stringify(nuevoObjeto));
      this.$router.push('/modificarElemento');
    }

  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
}

h2 {
  color: #555;
}

p {
  margin: 8px 0;
  color: #666;
}

button {
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>



