<template>
  <div class="main-container">
    <div class="left-side">
      <div class="image-container">
        <img src="src/assets/logo1.png" alt="" />
        <div>ESAN Labs - Dirección Audiovisual</div>
      </div>
      <div class="middle-container">Capturamos lo que imaginas.</div>
      <div class="footer-container">
        <button @click="handleButtonClick">¡Empecemos!</button>
      </div>
    </div>

    <div class="right-side">
      <img src="src/assets/collage.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background-image: linear-gradient(0, black 80%, rgb(82, 25, 25));
  color: white;
}

.main-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  background-image: linear-gradient(0, black 80%, rgb(82, 25, 25));
  font-family: Arial, Helvetica, sans-serif;
}
/* Left side of the page */
.left-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.image-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
  margin-left: 60px;
  margin-top: 60px;
  color: white;
  font-size: 24px;
}
.image-container img {
  width: 80px;
}
.image-container div {
  font-weight: bold;
}
.middle-container {
  font-size: 70px;
  font-weight: bold;
  margin-left: 60px;
  color: white;
}
.footer-container button {
  color: white;
  background-color: transparent;
  border: 4px solid white;
  border-radius: 40px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 40px;
  margin-left: 60px;
  margin-bottom: 100px;
  cursor: pointer;
}
/* Right side of the page */
.right-side {
  display: flex;
  flex-direction: column;
}
.right-side img {
  flex: 1;
  object-fit: cover;
  height: 100vh;
}
</style>

<script>
export default {
  methods: {
    handleButtonClick() {
      // Función que se ejecuta al hacer clic en el botón
      console.log("Botón clicado");
      this.$router.push("/login");
    },
  },
};
</script>
