
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
export default {

  created() {
    //AQUI TRAIGO LOS DATOS DEL EVENTO:
    const solicitudGuardada = localStorage.getItem("EventoCreado");
    if (solicitudGuardada) {
      // Parsear la solicitud guardada y asignarla al estado del componente
      const e = JSON.parse(solicitudGuardada);
      this.Evento.nombre = e.nombre;
      this.Evento.descripcion = e.descripcion;
      this.Evento.fechaEvento = e.fechaEvento;
      this.Evento.horaInicio = e.horaInicio;
      this.Evento.horaFin = e.horaFin;
      this.Evento.lugar = e.lugar;
      this.Evento.momentosImportantes = e.momentosImportantes;
      this.Evento.cantidadInvitados = e.cantidadInvitados;
    }

    //Aqui del servicio foto:

  const solicitudesGuardadas = localStorage.getItem('FotosSolicitadas');
  if (solicitudesGuardadas) {
    try {
      // Intentar parsear la cadena JSON y asignarla al array del componente
      this.fotos = JSON.parse(solicitudesGuardadas);
    } catch (error) {
      this.fotos = [];
    }
  }

  //AQUI DEL SERVICIO VIDEOS:
  const v = localStorage.getItem('VideosSolicitados');
  if (v) {
    try {
      // Intentar parsear la cadena JSON y asignarla al array del componente
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
      Evento : {
        nombre: '',
        descripcion: '',
        fechaEvento: '',
        horaInicio: '',
        horaFin: '',
        lugar: '',
        momentosImportantes: '',
        cantidadInvitados: 0,
      },
      fotos : [],
      videos: [],
      cc : null,
    };
  },

  methods: {
    regresarServiciosMenu(){
      this.$router.push('/services');
    },

    GuardarSolicitudes(){
      //AQUI VA LA APLICACIÓN DE LOS ENDPOINTS
    },

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



