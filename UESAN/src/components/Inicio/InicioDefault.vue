<template>
  <div class="home-container">
    <!-- Parte izquierda (60%) -->
    <div class="left-side">
      <q-img
        src="src/assets/logo1.png"
        basic
        style="width: 18%; height: auto"
      />
      ESAN Labs - Dirección Audiovisual
      <h1>Capturamos lo que imaginas.</h1>
      <!-- Contenido de la parte izquierda -->
      <q-btn
        label="¡Empecemos!"
        @click="handleButtonClick"
        class="q-mt-md"
        size="lg"
        rounded
        push
        padding="15px 50px"
        style="border: 4px solid white"
      />
    </div>

    <!-- Parte derecha (40%) -->
    <div class="right-side">
      <!-- Contenido de la parte derecha -->
      <q-img src="src/assets/imagen1.png" basic style="height: 100%" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 100px;
  margin-bottom: 100px;
}
/* Estilos personalizados para las partes izquierda y derecha */
.home-container {
  display: flex;
  height: 100vh;
}

.left-side {
  color: WHITE;
  width: auto;
  height: auto;
  flex: 0 0 46%;
  padding: 0px;
  margin-top: 60px;
  margin-left: 50px;
  font-size: 27px;
  font-family: arial;
  background-color: black;
}

.right-side {
  flex: 0 0 50%;
  padding: 0px;
  width: auto;
  height: auto;
}
</style>

<script>
export default {
  methods: {
    handleButtonClick() {
      // Función que se ejecuta al hacer clic en el botón
      console.log("Botón clicado");
      this.$router.push('/home');
    },
  },
};
</script>
