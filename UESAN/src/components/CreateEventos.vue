<template>
  <div class="fondo-container">
    <div class="main-container">
      <div class="title-container">Formulario del Evento</div>
      <form @submit.prevent="crearServicios">
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
            <div class="date-container">
              <label for="e.fechaEvento">Fecha del Evento:</label>
              <input type="date" v-model="e.fechaEvento" required />
            </div>

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
        <div class="btn-container">
          <button @click="crearServicios">Crear Servicios</button>
          <router-link to="Home">Regresar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    if (usuario) {
      this.idUsuario = usuario.idUsuario;
    }

    const solicitudGuardada = localStorage.getItem("EventoCreado");
    if (solicitudGuardada) {
      // Parsear la solicitud guardada y asignarla al estado del componente
      const e = JSON.parse(solicitudGuardada);
      this.nombre = e.nombre;
      this.descripcion = e.descripcion;
      this.fechaEvento = e.fechaEvento;
      this.horaInicio = e.horaInicio;
      this.horaFin = e.horaFin;
      this.lugar = e.lugar;
      this.momentosImportantes = e.momentosImportantes;
      this.cantidadInvitados = e.cantidadInvitados;
    }
  },

  data() {
    return {
      e: {
        nombre: "",
        descripcion: "",
        fechaEvento: "",
        horaInicio: "",
        horaFin: "",
        lugar: "",
        momentosImportantes: "",
        cantidadInvitados: 0,
        idUsuario: null,
      },
    };
  },
  methods: {
    crearServicios() {
      const EventoInsertDTO = {
        nombre: this.e.nombre,
        descripcion: this.e.descripcion,
        fechaEvento: new Date(this.e.fechaEvento).toISOString(),
        horaInicio: this.e.horaInicio,
        horaFin: this.e.horaFin,
        lugar: this.e.lugar,
        fechaCreacion: new Date().toISOString(),
        momentosImportantes: this.e.momentosImportantes,
        cantidadInvitados: Number(this.e.cantidadInvitados),
        idUsuario: 1,
      };

      localStorage.setItem("EventoCreado", JSON.stringify(EventoInsertDTO));

      /*
      const url = "http://localhost:5158/api/Eventos/CreateEventos";
      axios
        .post(url,EventoInsertDTO)
        .then((response) => {
          console.log("La respuesta es:  "+ response.data);
          localStorage.setItem("EventoCreado", response.data);

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
      //localStorage.setItem("EventoActual", this.evento.data);
      //localStorage.setItem("EventoActual", JSON.stringify(evento));
      // Redirige a la página de servicios
      this.limpiarFormulario();
      this.$router.push("/services");
    },
    limpiarFormulario() {
      this.e.nombre = "";
      this.e.descripcion = "";
      this.e.fechaEvento = "";
      this.e.horaInicio = "";
      this.e.horaFin = "";
      this.e.lugar = "";
      this.e.momentosImportantes = "";
      this.e.cantidadInvitados = 0;
    },
  },
};
</script>

<style scoped>
/*html {
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
}
body {
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  background-color: rgb(0, 0, 0, 0.8);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
*/
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
</style>
