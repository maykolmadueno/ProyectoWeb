<template>
  <div class="home-container">
    <!-- Parte izquierda (60%) -->
    <div class="left-side">
      <h2>Inicia sesión con tu cuenta institucional.</h2>
      <!-- Contenido de la parte izquierda -->
      <p>debe ser de dominio @esan.edu.pe</p>
    </div>

    <!-- Parte derecha (40%) -->
    <div class="right-side">
      <!-- Contenido de la parte derecha -->
      <div class="right-side-mail">
        <q-img
          src="src/assets/persona.png"
          basic
          style="width: 14%; height: auto; margin-right: 5px"
        />
        <q-input
          type="text"
          v-model="input1"
          class="q-mt-md"
          size="lg"
          style="
            border: 4px solid white;
            border-radius: 40px;
            margin-right: 50px;
            width: 80%;
            padding: 4px;
            color: white;
            text-align: center;
          "
          label="example@esan.edu.pe"
          label-color="white"
        />
      </div>
      <div class="right-side-password">
        <q-img
          src="src/assets/candado.png"
          basic
          style="width: 12%; height: auto"
        />
        <q-input
          type="password"
          v-model="input2"
          class="q-mt-md"
          size="lg"
          style="
            border: 4px solid white;
            border-radius: 40px;
            margin-right: 50px;
            width: 80%;
            padding: 4px;
          "
          label="Password"
          label-color="white"
        />
      </div>
      <!--<div class="right-side-button">-->
      <q-btn
        label="Iniciar Sesión"
        @click="handleButtonClick"
        class="q-mt-md"
        size="md"
        rounded
        push
        padding="2px 20px"
        style="
          border: 5px solid white;
          font-weight: bold;
          font-family: 'Courier New', Courier, monospace;
          font-size: 18px;
          margin-left: 35%;
        "
      />
      <!--</div>-->
    </div>
  </div>
</template>

<style scoped>
h2 {
  padding-right: 40px;
  padding-left: 40px;
  font-weight: bold;
}
p {
  padding-right: 40px;
  padding-left: 40px;
}
/* Estilos personalizados para las partes izquierda y derecha */
.home-container {
  display: flex;
  height: 100vh;
  align-items: center;
  background-color: transparent;
}

.left-side {
  color: white;
  width: auto;
  height: auto;
  /* flex: 0 0 46%; */
  flex: 0 0 50%;
  padding-bottom: 50px;
  margin-left: 50px;
  /* margin-right: 50px; */
  font-size: 27px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: black;
  /* font-weight: bold; */
  margin-bottom: 100px;
}

.right-side {
  flex: 0 0 40%;
  font-family: arial;
  color: white;
  background-color: transparent;
  margin-bottom: 80px;
}
.right-side-mail {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
.right-side-password {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}
</style>

<script>
export default {
  methods: {
    handleButtonClick() {
      // Función que se ejecuta al hacer clic en el botón
      console.log("Botón clicado");
    },
  },
};
</script>
