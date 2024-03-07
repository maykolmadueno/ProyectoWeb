
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
import html2pdf from 'html2pdf.js';
export default {

  created() {
    //AQUI TRAIGO LOS DATOS DEL EVENTO:
    const solicitudGuardada = localStorage.getItem("EventoCreado");
    if (solicitudGuardada) {
      this.Evento = JSON.parse(solicitudGuardada);
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

  //Traigo el token:
  const usu = localStorage.getItem("usuarioActual");
  if(usu){
    const u = JSON.parse(usu);
    this.token = u.token;
    this.id = u.idUsuario;
  }


  },

  data() {
    return {
      Evento : null,
      fotos : [],
      videos: [],
      cc : null,
      token : '',
      nombre : '',
      correo : '',
      id: 0,
    };
  },

  methods: {
    regresarServiciosMenu(){
      this.$router.push('/services');
    },

    async GuardarSolicitudes(){
      let idEvento = await this.CrearEvento();
      await this.CrearServiciosFotos(idEvento);
      await this.crearServicioVideos(idEvento);
      await this.CrearServicioCC(idEvento);
      console.log("Acontinuacion enviara el correo : ")
      await this.generateAndSendPdf();

      localStorage.removeItem('EventoCreado');
      localStorage.removeItem('FotosSolicitadas');
      localStorage.removeItem('VideosSolicitados');
      localStorage.removeItem('CCSolicitud');

      //Aqui llamo a la función que enviará el pdf por correo.





      this.$q.notify({
            //message: `Error al traer los ${objeto}`,
            message: "El evento y sus servicios se crearon con éxito",
            color: "positive",
            position: "top",
            timeout: 4000,
          });
      this.$router.push('/Home');

    },

    async getUsuario(){
      const url = `http://localhost:5158/api/Usuario/${this.id}`;
      try {
          const response = await  axios.get(url, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
          });
          console.log("datos del usuario : " + response.data);
          return response.data;
        } catch (error) {
          console.error('Error al enviar la solicitud: ', error);
        }

    },

    async generateAndSendPdf() {
      // Generar el PDF desde el HTML de la página actual
      const element = document.documentElement;
      const opt = {
        margin:       1,
        filename:     this.Evento.nombre + '.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      let usuario = await this.getUsuario();
      console.log("Nombre del usuario : " + usuario.nombre + " correo del usuario : " + usuario.correo);

      try {
        const pdf = await html2pdf().set(opt).from(element).toPdf().get('pdf');
        const blob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
        const formData = new FormData();
        formData.append('pdfFile', blob, this.Evento.nombre + '.pdf'); // Adjuntar el archivo PDF al FormData
        formData.append('Para', usuario.correo); // Adjuntar el atributo 'Para' al FormData
        formData.append('Nombre', usuario.nombre); // Adjuntar el atributo 'Nombre' al FormData

        // Enviar el FormData al backend
        const response = await axios.post('http://localhost:5158/api/Email/sendEmailPDF', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.token}`
          }
        });
        console.log("Respuesta del envio del correo : " + response.data);
      } catch (error) {
        console.error('Error al enviar el PDF:', error);
      }
    },

    async CrearEvento(){
      let url = "http://localhost:5158/api/Eventos/CreateEventos";
      return await this.FuncionEP(url,this.Evento,true, "evento ");
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
        let idServicios = await this.FuncionEP(url,servicio,true, "servicio fotos");
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
          // Ahora creo las fotos individuales y espero su resolución antes de continuar con la siguiente iteración
          await this.FuncionEP(url, f, false, "fotos");
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
        let idServicios = await this.FuncionEP(url,servicio,true,"servicio Video");
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
          await this.FuncionEP(urlv, v, false,"videos");
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
        let idServicios = await this.FuncionEP(url, servicio, true, "servicios circuitocerrado");
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
        const urls = "http://localhost:5158/api/CircuitoCerrado/CreateCircuitoCeraddo";
        await this.FuncionEP(urls,circuito,false,"circuito cerrado");
      }
    },

    async FuncionEP(url, objeto, retorna,cadena){

      try{
        const response = await axios.post(url,objeto,{
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
        });
        console.log("La respuesta es: ", response.data + " al crear " + cadena);
        if (retorna) {
          return response.data;
        }
      }catch{
        console.log("Ocurrió un error al crear : " + cadena );
      }

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



