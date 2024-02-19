<template>
  <div class="main-container">
    <div class="titulo-uno-container">
      <h3>Filtrar:</h3>
    </div>
    <div class="filtro-container">
      <div class="filtro-nombre-container">
        <input
          type="text"
          v-model="filtroNombre"
          @input="aplicarFiltro"
          placeholder="Nombre"
        />
      </div>
      <div class="filtro-area-container">
        <input
          type="text"
          v-model="filtroArea"
          @input="aplicarFiltro"
          placeholder="Área"
        />
      </div>

      <div class="filtro-estado-container">
        <select v-model="filtroEstado" @change="aplicarFiltro">
          <option value="">Todos los estados</option>
          <option value="Activo              ">Activo</option>
          <option value="inactivo            ">Eliminado</option>
        </select>
      </div>

      <div class="btn-limpiar-container">
        <button @click="limpiarFiltro">Limpiar</button>
      </div>
    </div>

    <div class="table-usuarios-container">
      <div class="titulo-dos-container">
        <h3>Usuarios:</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Area</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
            <td>{{ usuario.idUsuario }}</td>
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.correo }}</td>
            <td>{{ usuario.area }}</td>
            <td>{{ usuario.estado }}</td>
            <td>
              <button
                v-if="usuario.estado != 'inactivo            '"
                @click="borrarUsuarioConfirmar(usuario.idUsuario)"
              >
                Borrar
              </button>
              <button
                v-if="usuario.estado != 'inactivo            '"
                @click="cambiarContrasena(usuario)"
              >
                Cambiar contraseña
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ModalC
      :mostrar="mostrarModalEliminar"
      :onConfirmar="eliminarUsuarioConfirmado"
      :onCancelar="cancelarEliminarUsuario"
    >
      <h3>¿Desea eliminar a este usuario ?</h3>
    </ModalC>

    <ModalC
      :mostrar="mostrarModalModificar"
      :onConfirmar="cambiarContrasenaConfirmado"
      :onCancelar="cancelarModificarUsuario"
    >
      <p>¿Desea modificar la contraseña del usuario?</p>
    </ModalC>

    <CambiarContrasenaModal
      :mostrar="mostrarModalCambiarContrasena"
      :onConfirmar="confirmarCambioFinal"
      :onCancelar="cancelarCambiarContrasena"
    />
  </div>
</template>

<script>
import CambiarContrasenaModal from "src/components/Modal/ModalNuevaContra.vue";
import ModalC from "src/components/Modal/ModalC.vue";
import axios from "axios";
import emailjs from "emailjs-com";

export default {
  components: {
    CambiarContrasenaModal,
    ModalC,
  },

  data() {
    return {
      usuarios: [],
      usuariosFiltrados: [],
      filtroNombre: "",
      filtroArea: "",
      filtroEstado: "",
      mostrarModalEliminar: false,
      usuarioAEliminarId: null,
      mostrarModalModificar: false,
      usuarioM: null,
      nuevaContra: null,
      mostrarModalCambiarContrasena: false,
    };
  },
  mounted() {
    this.getUsuarios();
  },
  methods: {
    async getUsuarios() {
      try {
        const response = await axios.get(
          "http://localhost:5158/api/Usuario/GetAll?estado=todos"
        );
        this.usuarios = response.data;
        this.usuariosFiltrados = [...this.usuarios];
      } catch (error) {
        console.error("Error:", error);
        this.$q.notify({
          message: "Error al traer los usuarios...",
          color: "positive",
          position: "top",
          timeout: 3000,
        });
      }
    },

    aplicarFiltro() {
      this.usuariosFiltrados = this.usuarios.filter((usuario) => {
        return (
          (this.filtroNombre === "" ||
            usuario.nombre
              .toLowerCase()
              .includes(this.filtroNombre.toLowerCase())) &&
          (this.filtroArea === "" || usuario.area === this.filtroArea) &&
          (this.filtroEstado === "" || usuario.estado === this.filtroEstado)
        );
      });
    },
    limpiarFiltro() {
      this.filtroNombre = "";
      this.filtroArea = "";
      this.filtroEstado = "";
      this.usuariosFiltrados = [...this.usuarios];
    },

    borrarUsuarioConfirmar(idUsuario) {
      this.usuarioAEliminarId = idUsuario;
      this.mostrarModalEliminar = true;
    },

    async eliminarUsuarioConfirmado() {
      try {
        this.mostrarModalEliminar = false;
        const response = await axios.delete(
          `http://localhost:5158/api/Usuario?id=${this.usuarioAEliminarId}`
        );
        console.log("Operación de eliminación : " + response);
        this.$q.notify({
          message: "El usuario se eliminó con éxito",
          color: "positive",
          position: "top",
          timeout: 3000,
        });
        this.getUsuarios();
      } catch (error) {
        console.error("Error al borrar el usuario:", error);
        this.$q.notify({
          message: "No se pudo eliminar al usuario",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
      }
    },
    cancelarEliminarUsuario() {
      this.mostrarModalEliminar = false;
    },

    cancelarModificarUsuario() {
      this.mostrarModalModificar = false;
    },

    cambiarContrasena(Usuario) {
      this.usuarioM = Usuario;
      this.mostrarModalCambiarContrasena = true;
    },

    cancelarCambiarContrasena() {
      this.mostrarModalCambiarContrasena = false;
    },

    async cambiarContrasenaConfirmado() {
      try {
        const u = {
          idUsuario: this.usuarioM.idUsuario,
          correo: this.usuarioM.correo,
          nombre: this.usuarioM.nombre,
          tipo: "normal",
          estado: "Activo",
          contra: this.nuevaContra,
        };
        this.mostrarModalModificar = false;
        const response = await axios.put(
          "http://localhost:5158/api/Usuario",
          u
        );
        if (response.data === true) {
          const datosCorreo = {
            from_name: "AudioVusuales",
            to_name: this.usuarioM.nombre, // Nombre del destinatario
            correo: this.usuarioM.correo,
            password: this.nuevaContra, // Incluimos la nueva contraseña en los datos del correo
            // Puedes agregar más datos si es necesario
          };
          this.enviarCorreo(datosCorreo);
          this.$q.notify({
            message: "La contraseña se cambió con éxito",
            color: "positive",
            position: "top",
            timeout: 3000,
          });
        }
        this.getUsuarios();
      } catch (error) {
        console.error("Error al cambiar la contraseña del usuario:", error);
      }
    },

    enviarCorreo(datos) {
      // Definimos los IDs del servicio y la plantilla de correo
      const serviceID = "default_service";
      const templateID = "template_73ccukn";

      // Enviamos los datos a través de EmailJS
      emailjs
        .send(serviceID, templateID, datos)
        .then(() => {
          console.log("¡Correo enviado con éxito!");
        })
        .catch((error) => {
          console.error("Error al enviar el correo:", error);
        });
    },

    confirmarCambioFinal(nuevaC) {
      this.nuevaContra = nuevaC;
      this.mostrarModalModificar = true;
      this.mostrarModalCambiarContrasena = false;
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
}
h3 {
  margin: 0;
}
.titulo-uno-container h3 {
  margin-bottom: 10px;
}
.filtro-container {
  display: flex;
  flex-direction: row;
  align-items: end;
  width: 100%;
  column-gap: 30px;
}
.filtro-container button {
  height: 35px;
}
select {
  height: 33px;
}
.tabla-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
table {
  width: 100%;
}
.filtro-nombre-container,
.filtro-area-container {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

th,
td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

/* tr:nth-child(even) {
  background-color: #f2f2f2;
} */

tr:hover {
  background-color: rgba(223, 112, 112, 0.3);
}

.titulo-dos-container h3 {
  margin-top: 30px;
  margin-bottom: 10px;
}
table {
  width: 100%;
}
th {
  background-color: rgb(255, 255, 255);
  color: rgb(119, 15, 15);
  text-align: center;
  padding: 5px;
}

td {
  border: 1px solid #dddddd;
  padding: 10px;
  text-align: left;
}

/* tr:nth-child(even) {
  background-color: #f2f2f2;
} */

tr:hover {
  background-color: rgba(223, 112, 112, 0.3);
}

button {
  width: 100%;
  font-size: 14px;
}
button:hover {
  opacity: 0.8;
}
</style>
