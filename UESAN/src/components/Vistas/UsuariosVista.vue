<template>
  <div>
    <div class="filtro">
      <h3>Filtrar:</h3>
      <input type="text" v-model="filtroNombre" @input="aplicarFiltro" placeholder="Nombre">
      <input type="text" v-model="filtroArea" @input="aplicarFiltro" placeholder="Área">
      <select v-model="filtroEstado" @change="aplicarFiltro">
        <option value="">Todos los estados</option>
        <option value="Activo              " >Activo</option>
        <option value="inactivo            ">Eliminado</option>
      </select>
      <button @click="aplicarFiltro">Filtrar</button>
      <button @click="limpiarFiltro">Limpiar</button>
    </div>
    <h2>Usuarios</h2>
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

            <button v-if = "usuario.estado != 'inactivo            '"  @click="borrarUsuarioConfirmar(usuario.idUsuario)">Borrar</button>
            <button v-if = "usuario.estado != 'inactivo            '" @click="cambiarContrasena(usuario)">Cambiar contraseña</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ModalC :mostrar="mostrarModalEliminar"
           :onConfirmar="eliminarUsuarioConfirmado"
           :onCancelar="cancelarEliminarUsuario">
           <h3>¿Desea eliminar a este usuario ?</h3>
    </ModalC>

    <ModalC :mostrar="mostrarModalModificar"
           :onConfirmar="cambiarContrasenaConfirmado"
           :onCancelar="cancelarModificarUsuario">
           <p>¿Desea modificar la contraseña del usuario?</p>
    </ModalC>

    <CambiarContrasenaModal :mostrar="mostrarModalCambiarContrasena"
                             :onConfirmar="confirmarCambioFinal"
                             :onCancelar="cancelarCambiarContrasena" />

  </div>
</template>

<script>
import CambiarContrasenaModal from 'src/components/Modal/ModalNuevaContra.vue';
import ModalC from 'src/components/Modal/ModalC.vue';
import axios from "axios";

export default {

  components: {
    CambiarContrasenaModal,
    ModalC
  },

  data() {
    return {
      usuarios: [],
      usuariosFiltrados: [],
      filtroNombre: '',
      filtroArea: '',
      filtroEstado: '',
      mostrarModalEliminar: false,
      usuarioAEliminarId: null,
      mostrarModalModificar : false,
      usuarioM : null,
      nuevaContra : null,
      mostrarModalCambiarContrasena : false,
    };
  },
  mounted() {
    this.getUsuarios();
  },
  methods: {
    async getUsuarios() {
      try {
        const response = await axios.get('http://localhost:5158/api/Usuario/GetAll?estado=todos');
        this.usuarios = response.data;
        this.usuariosFiltrados = [...this.usuarios];
      } catch (error) {
        console.error('Error:', error);
      }
    },


    aplicarFiltro() {
      this.usuariosFiltrados = this.usuarios.filter(usuario => {
        return (
          (this.filtroNombre === '' || usuario.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())) &&
          (this.filtroArea === '' || usuario.area === this.filtroArea) &&
          (this.filtroEstado === '' || usuario.estado === this.filtroEstado)
        );
      });

    },
    limpiarFiltro() {
      this.filtroNombre = '';
      this.filtroArea = '';
      this.filtroEstado = '';
      this.usuariosFiltrados = [...this.usuarios];
    },

    borrarUsuarioConfirmar(idUsuario) {
      this.usuarioAEliminarId = idUsuario;
      this.mostrarModalEliminar = true;
    },


    async eliminarUsuarioConfirmado() {
      try {
        this.mostrarModalEliminar = false;
        const response = await axios.delete(`http://localhost:5158/api/Usuario?id=${this.usuarioAEliminarId}`);
        console.log("Operación de eliminación : " + response);
        this.$q.notify({
            message: "El usuario se eliminó con éxito",
            color: "positive",
            position: "top",
            timeout: 3000,

          });
        this.getUsuarios();
      } catch (error) {
        console.error('Error al borrar el usuario:', error);
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

    cancelarModificarUsuario(){
      this.mostrarModalModificar = false;
    },

    cambiarContrasena(Usuario){
      this.usuarioM = Usuario;
      this.mostrarModalCambiarContrasena = true;
    },

    cancelarCambiarContrasena(){
      this.mostrarModalCambiarContrasena = false;
    },

    async cambiarContrasenaConfirmado(){
      try {
        const u = {
          idUsuario : this.usuarioM.idUsuario,
          correo : this.usuarioM.correo,
          nombre : this.usuarioM.nombre,
          tipo : 'normal',
          estado : this.this.usuarioM.estado,
          contra : this.nuevaContra,
        }
      this.mostrarModalModificar = false;
      const response = await axios.put("http://localhost:5158/api/Usuario",u);
      if(response.data === true){
        this.$q.notify({
            message: "La contraseña se cambió con éxito",
            color: "positive",
            position: "top",
            timeout: 3000,
          });
      }
      this.getUsuarios();
    } catch (error) {
      console.error('Error al cambiar la contraseña del usuario:', error);
    }
    },

    confirmarCambioFinal(nuevaC){
      this.nuevaContra = nuevaC;
      this.mostrarModalModificar = true;
      this.mostrarModalCambiarContrasena = false;
    }
  }
};
</script>

<style>
.filtro {
  margin-bottom: 20px;
}
.filtro input[type="text"], .filtro select {
  margin-right: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}
</style>
