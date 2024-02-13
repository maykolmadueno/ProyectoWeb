<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-side">
        <img src="src/assets/logo2.png" alt="" />
        <p>ESAN Labs</p>
      </div>
      <div class="right-side">
        <button @click="VistaUsuarios" :disabled="!usuariosButtonEnabled">Gestión Usuarios</button>
        <button @click="VistaEventos" :disabled="!eventosButtonEnabled">Gestión Eventos</button>
        <button @click="salir">Salir</button>
        <img src="src/assets/persona.png" alt="" />
      </div>
    </div>
    <div class="content">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Usuarios from 'components/Vistas/UsuariosVista.vue';
//import Eventos from '@/components/Eventos.vue';

export default {

  components: {
    Usuarios,
    //Eventos
  },

  data() {
    return {
      currentComponent: null,
      usuariosButtonEnabled: true,
      eventosButtonEnabled: true
    };
  },

  methods: {


    VistaUsuarios(){
      if (this.usuariosButtonEnabled) {
        // Cambia el componente actual a Usuarios.vue
        this.currentComponent = 'Usuarios';
        this.usuariosButtonEnabled = false; // Deshabilita el botón
        this.eventosButtonEnabled = true; // Habilita el otro botón
      }
    },

    VistaEventos(){
      if (this.eventosButtonEnabled) {
        // Cambia el componente actual a Eventos.vue
        this.currentComponent = 'Eventos';
        this.eventosButtonEnabled = false; // Deshabilita el botón
        this.usuariosButtonEnabled = true; // Habilita el otro botón
      }
    },

    salir(){
      this.$router.push('/Home');
    }

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
</style>

