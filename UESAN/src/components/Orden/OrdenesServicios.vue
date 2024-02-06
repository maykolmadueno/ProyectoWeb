
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

    </div>

    <!-- Fotos -->

    <div class="fotos" v-if="fotos.length > 0">
      <h2>Solicitudes Guardadas</h2>
      <div v-for="(foto, index) in fotos" :key="index" class="solicitud-item">
        <div>
          <strong>Solicitud {{ index + 1 }}</strong>
        </div>
        <div>Cantidad: {{ foto.cantidad }}</div>
        <div>Tipo: {{ foto.tipo }}</div>
        <div>Persona Objetivo: {{ foto.persona }}</div>
        <div>Canales: {{ foto.canales }}</div>
        <div>Link Destino: {{ foto.linkDestino }}</div>
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
          </div>
        </div>
    </div>

    <div v-if="cc">
      <h2>Solicitud de circuito cerrado</h2>
      <p>Guardar: {{ cc.guardar }}</p>
      <p>Link: {{ cc.link }}</p>
      <p>Número de Cámaras: {{ cc.numeroCamaras }}</p>
      <p>Número de Ángulos: {{ cc.numeroAngulos }}</p>
      <p>Ángulos Seleccionados: {{ cc && cc.angulos ? cc.angulos.join(', ') : 'N/A' }}</p>


    </div>



    <button @click="regresarServiciosMenu">Regresar a servicios</button>
    <button @click="GuardarSolicitudes">Guardar Solicitudes</button>

  </div>
</template>


<script>
import axios from "axios";
export default {

  created() {
    //AQUI TRAIGO LOS DATOS DEL EVENTO:
    const solicitudGuardada = localStorage.getItem("EventoCreado");
    if (solicitudGuardada) {
      this.Evento = JSON.parse(solicitudGuardada);
      /*this.Evento.nombre = e.nombre;
      this.Evento.descripcion = e.descripcion;
      this.Evento.fechaEvento = e.fechaEvento;
      this.Evento.horaInicio = e.horaInicio;
      this.Evento.horaFin = e.horaFin;
      this.Evento.lugar = e.lugar;
      this.Evento.momentosImportantes = e.momentosImportantes;
      this.Evento.cantidadInvitados = e.cantidadInvitados;*/
    }

    //Aqui del servicio foto:

  const solicitudesGuardadas = localStorage.getItem('FotosSolicitadas');
  if (solicitudesGuardadas) {
    try {
      this.fotos = JSON.parse(solicitudesGuardadas);
    } catch (error) {
      this.fotos = [];
    }
  }

  //AQUI DEL SERVICIO VIDEOS:
  const v = localStorage.getItem('VideosSolicitados');
  if (v) {
    try {
      this.videos = JSON.parse(v);
    } catch (error) {
      this.videos = [];
    }
  }

  //CIRCUITO CERRADO:
  const c = localStorage.getItem("CCSolicitud");
    if (c) {
      this.cc = JSON.parse(c);
    }


  },

  data() {
    return {
      Evento : null,
      fotos : [],
      videos: [],
      cc : null,
    };
  },

  methods: {
    regresarServiciosMenu(){
      this.$router.push('/services');
    },

    async GuardarSolicitudes(){
      let idEvento = await this.CrearEvento();
      console.log("ID DEL EVENTO CREADO : " + idEvento);
      await this.CrearServiciosFotos(idEvento);
      await this.crearServicioVideos(idEvento);
      await this.CrearServicioCC(idEvento);

    },

    async CrearEvento(){
      let url = "http://localhost:5158/api/Eventos/CreateEventos";
      return await this.FuncionEP(url,this.Evento,true);
    },

    async CrearServiciosFotos(ide){
      if(this.fotos.length > 0){
        //Primero creo el objetoservicio
        const servicio = {
          idEvento : ide,
          nombre : "Fotos",
          tipo : "foto"
        }
        //luego llamo a la api servicio.
        let url = "http://localhost:5158/api/Servicio/CreateServicio";
        let idServicios = await this.FuncionEP(url,servicio,true);
        console.log("ID DEL SERVICIO  EN FOTO CREADO : " +idServicios)
        //Luego de crear el servicio fotos, puedo crear los elementos individuales.
        url = "http://localhost:5158/api/ServicioFotos/CreateServicioFotos";
        for (const element of this.fotos) {

        let numero = element.cantidad;
        let cadena = numero.toString();
        let f = {
          idServicio: idServicios,
          cantidadFotos: cadena,
          tipoFoto: element.tipo,
          pesonaObjetivo: element.persona,
          canales: element.canales,
          link: element.linkDestino
        };

        console.log("Objeto foto  enviado : " + JSON.stringify(f))
          // Ahora creo las fotos individuales y espero su resolución antes de continuar con la siguiente iteración
          await this.FuncionEP(url, f, false);
        }
      }
    },

    async crearServicioVideos(ide){
      if(this.videos.length > 0){
        //Primero creo el objetoservicio
        const servicio = {
          idEvento : ide,
          nombre : "Videos",
          tipo : "video"
        }
        //luego llamo a la api servicio.
        const url = "http://localhost:5158/api/Servicio/CreateServicio";
        let idServicios = await this.FuncionEP(url,servicio,true);
        //Luego de crear el servicio videos, puedo crear los elementos individuales.
        let urlv = "http://localhost:5158/api/Video/CreateVideo";
        for (const element of this.videos) {
          let v = {
            nombre: element.nombre,
            link: element.link,
            nombreObjetivo: element.nombreObjetivo,
            lugarFilmacion: element.lugarFilmacion,
            idServicio: idServicios,
          };
          // Ahora creo los videos individuales:
          await this.FuncionEP(urlv, v, false);
        }
      }
    },

    async CrearServicioCC(ide){
      if(this.cc != null){
        const servicio = {
          idEvento : ide,
          nombre : "CircuitoCerrado",
          tipo : "CircuitoCerrado"
        }
        //luego llamo a la api servicio.
        const url = "http://localhost:5158/api/Servicio/CreateServicio";
        let idServicios = await this.FuncionEP(url, servicio, true);
        //Creo el circuito cerrado:

        let array = this.cc.angulos;
        let nAngulos = this.cc.numeroAngulos;
        let cadena = array.join("-");
        let ang = nAngulos.toString();

        const circuito = {
          idServicio : idServicios,
          guardar: this.cc.guardar,
          link: this.cc.link,
          numeroCamaras: this.cc.numeroCamaras,
          numeroAngulos: ang,
          angulos: cadena,
        }

        console.log("Objeto Circuito Cerrado enviado : " + JSON.stringify(circuito))
        const urls = "http://localhost:5158/api/CircuitoCerrado/CreateCircuitoCeraddo";
        await this.FuncionEP(urls,circuito,false);
      }
    },

    async FuncionEP(url, objeto, retorna){

      try{
        const response = await axios.post(url,objeto);
        console.log("La respuesta es: ", response.data);
        if (retorna) {
          return response.data;
        }
      }catch{
        console.log("Ocurrió un error: ");
      }


      /*
      axios
        .post(url,objeto)
        .then((response) => {
          console.log("La respuesta es:  "+ response.data);
          if(retorna){
            return response.data;
          }
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
        */
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



