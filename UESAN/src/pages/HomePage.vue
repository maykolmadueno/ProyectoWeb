<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-side">
        <img src="src/assets/logo2.png" alt="" />
        <p>ESAN Labs</p>
      </div>
      <div class="right-side">
        <u v-if="mostrar" @click="ventanaAdmin">Administrador</u>
        <u>Home</u>
        <u @click="irA('VistaEventosUsuario')">Mis Eventos </u>
        <u>Mi Multimedia</u>
        <button @click="nuevoEvento">NUEVO EVENTO</button>
        <div class="dropdown" @click="toggleMenu">
          <img src="src/assets/persona.png" alt="" />
          <div v-if="mostrarMenu" class="dropdown-content">
            <u @click="cerrarSesion">Cerrar sesión</u>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div>DIVISIÓN AUDIOVISUAL DE ESAN LABS</div>
      <div>Dispuestos. Puntuales. Profesionales.</div>
    </div>

    <div class="footer">
      <div>SOLICITA LA COBERTURA AUDIOVISUAL DE UN EVENTO</div>
      <div>¡EN TAN SOLO <span>3 PASOS!</span></div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.cambioMostrar();
  },

  data() {
    return {
      usuario: null,
      mostrar: false,
      mostrarMenu: false, // Agregamos mostrarMenu para controlar la visibilidad del menú desplegable
    };
  },

  methods: {
    cambioMostrar() {
      const u = localStorage.getItem("usuarioActual");
      if (u) {
        try {
          this.usuario = JSON.parse(u);
          if (this.usuario.tipo == "Admin") {
            this.mostrar = true;
          }
        } catch (error) {
          this.usuario = null;
        }
      }
    },

    irA(ruta) {
      this.$router.push({ path: ruta });
    },

    nuevoEvento() {
      this.$router.push("/CreateEventos");
      // Lógica para el botón Nuevo Evento
    },

    ventanaAdmin() {
      this.$router.push("/AdminPrincipal");
    },

    toggleMenu() {
      this.mostrarMenu = !this.mostrarMenu; // Alternar la visibilidad del menú desplegable
    },

    cerrarSesion() {
      // Lógica para cerrar sesión
      localStorage.removeItem("usuarioActual");
      this.$router.push("/login"); // Redirigir a la página de inicio de sesión
    },
  },
};
</script>

<style scoped>
body {
  background-image: linear-gradient(black 50%, rgb(82, 25, 25));
  margin: 0;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  height: 100%;
}

.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background-image: linear-gradient(black 50%, rgb(82, 25, 25));
  margin: 0;
  padding: 0;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  /* height: 100%; */
}
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(177, 172, 172, 0.2);
  margin-top: 10px;
}

/* left side of navbar */
.left-side {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 60px;
}
.left-side p {
  font-size: 25px;
  font-weight: bold;
}

.left-side img {
  width: 70px;
  height: 60px;
  vertical-align: middle;
}

/* right side of navbar */
.right-side {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;
  margin-right: 60px;
}
.right-side u {
  text-decoration: none;
  cursor: pointer;
}

.right-side img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.right-side button {
  color: white;
  background-color: transparent;
  padding: 10px 20px;
  border: 3px solid white;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

/* content of the page */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  margin-top: 20px;
  flex: 1;
}
.content :first-child {
  font-size: 40px;
  font-weight: bold;
}
.content :last-child {
  font-size: 30px;
}
/* Footer*/
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  margin-bottom: 40px;
  font-size: 20px;
}
.footer span {
  text-decoration: underline;
}
/* Estilos para el menú desplegable */
.dropdown {
  position: relative;

  display: inline-block;
  cursor: pointer; /* Asegúrate de que el cursor sea un puntero */
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 90px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content u {
  color: black;
  padding: 5px 2px;
  text-decoration: none;
  display: block;
}

.dropdown-content u:hover {
  background-color: #eb6e6e;
  border-radius: 5px;
}
</style>
