<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-side">
        <img src="src/assets/logo2.png" alt="" />
        <p>ESAN Labs</p>
      </div>
      <div class="right-side">
        <u>Home</u>
        <u>Mis Eventos</u>
        <u>Mi Multimedia</u>
        <button>NUEVO EVENTO</button>
        <img src="src/assets/persona.png" alt="" />
      </div>
    </div>
    <div class="content">
      <p>AGREGA LOS SERVICIOS QUE DESEAS</p>

      <div class="services">
        <div class="img-container photo-service">
          <img src="src/assets/fotografias.png" alt="" />
          <div>FOTOGRAFÍA</div>
        </div>
        <div class="img-container video-service">
          <img src="src/assets/videos.png" alt="" />
          <div>VIDEOS</div>
        </div>
        <div class="img-container streaming-service">
          <img src="src/assets/streaming.png" alt="" />
          <div>STREAMING</div>
        </div>
        <div class="img-container edition-service">
          <img src="src/assets/edicion.png" alt="" />
          <div>EDICIÓN</div>
        </div>
        <div class="img-container circuit-service">
          <img src="src/assets/circuito_cerrado.png" alt="" />
          <div>CIRCUITO CERRADO</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <button>VER ORDEN</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    irA(ruta) {
      this.$router.push({ path: ruta });
    },
    nuevoEvento() {
      // Lógica para el botón Nuevo Evento
    },
  },
};
</script>

<style>
body {
  background-image: linear-gradient(0, black 50%, rgb(82, 25, 25));
  margin: 0;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  /* height: 100%; */
}

.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
}
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(177, 172, 172, 0.2);
  background-color: black;
  padding-top: 10px;
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
  row-gap: 80px;
  flex: 1;
}
.content p {
  font-size: 40px;
  font-weight: bold;
  margin-top: 40px;
}
.services {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 40px;
}
.img-container {
  border: none;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  padding-bottom: 10px;
  font-weight: bold;
}
.img-container img {
  width: 170px;
  height: 170px;
  margin: 10px;
  object-fit: cover;
}

/* Footer*/
.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
}

.footer button {
  color: white;
  background-color: transparent;
  padding: 15px 45px;
  border-radius: 30px;
  border: 3px solid white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>
