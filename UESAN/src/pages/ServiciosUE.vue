<template>
  <q-layout view="lHh LpR lFf" class="fondo-negro">
    <!-- Header -->
    <q-header elevated class="fondo-negro css-header">
      <q-toolbar>
        <!-- Icono en la parte izquierda -->
        <q-img
          src="src/assets/logo2.png"
          basic
          style="width: 5%; height: auto"
        />

        <q-toolbar-title style="font-size: 40px; font-weight: bold"
          >ESAN Labs</q-toolbar-title
        >

        <!-- Botones en la parte derecha -->
        <q-btn flat label="Home" @click="irA('home')" />
        <q-btn flat label="Mis Eventos" @click="irA('mis-eventos')" />
        <q-btn flat label="Mi Multimedia" @click="irA('mi-multimedia')" />
        <q-btn
          flat
          label="Nuevo Evento"
          @click="nuevoEvento"
          class="css-btn-ne"
        />
        <q-img
          src="src/assets/persona.png"
          basic
          style="width: 3.5%; height: auto; margin-right: 40px"
        />
      </q-toolbar>
    </q-header>

    <!-- Contenido -->
    <q-page-container class="css-contenido">
      <div class="q-pa-md">
        <h2>AGREGA LOS SERVICIOS QUE DESEAS</h2>
      </div>
      <div class="q-gutter-md q-row justify-center" style="gap: 20px">
        <!-- Tarjeta de Fotografías -->
        <q-card v-on:click="irA('ServicioFotos')" class="q-pa-md cursor-pointer">
          <q-img
            src="src/assets/fotografias.png"
            basic
            style="width: 200px; height: auto; margin-bottom: 10px"
          />
          <q-card-section class="text-h6 text-center" style="color: black"
            >FOTOGRAFIAS</q-card-section
          >
        </q-card>

        <!-- Tarjeta de Videos -->
        <q-card v-on:click="irA('ServicioVideos')" class="q-pa-md cursor-pointer">
          <q-img
            src="src/assets/videos.png"
            basic
            style="width: 200px; height: auto; margin-bottom: 10px"
          />
          <q-card-section class="text-h6 text-center" style="color: black"
            >VIDEOS</q-card-section
          >
        </q-card>

        <!-- Tarjeta de Streaming -->
        <q-card v-on:click="irA('ServicioStreaming')" class="q-pa-md cursor-pointer">
          <q-img
            src="src/assets/streaming.png"
            basic
            style="width: 200px; height: auto; margin-bottom: 10px"
          />
          <q-card-section class="text-h6 text-center" style="color: black"
            >STREAMING</q-card-section
          >
        </q-card>

        <!-- Tarjeta de Edición -->
        <q-card v-on:click="irA('edicion')" class="q-pa-md cursor-pointer">
          <q-img
            src="src/assets/edicion.png"
            basic
            style="width: 200px; height: auto; margin-bottom: 10px"
          />
          <q-card-section class="text-h6 text-center" style="color: black"
            >EDICION</q-card-section
          >
        </q-card>

        <!-- Tarjeta de Circuito Cerrado -->
        <q-card
          v-on:click="irA('circuito-cerrado')"
          class="q-pa-md cursor-pointer"
        >
          <q-img
            src="src/assets/circuito_cerrado.png"
            basic
            style="width: 200px; height: auto; margin-bottom: 10px"
          />
          <q-card-section class="text-h6 text-center" style="color: black"
            >CIRCUITO CERRADO</q-card-section
          >
        </q-card>
      </div>
    </q-page-container>

    <!-- Footer -->
    <q-footer elevated class="fondo-negro css-footer">
      <q-toolbar>
        <q-btn
          label="Ver Orden"
          @click="handleButtonClick"
          class="q-mt-md"
          size="lg"
          rounded
          push
          padding="15px 50px"
          style="
            border: 4px solid white;
            font-weight: bold;
            border-radius: 40px;
          "
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
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
.fondo-negro {
  background-color: black;
  color: white;
  padding: 20px;
}
.css-btn-ne {
  border: 2.5px solid white;
  border-radius: 20px;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  font-size: 18px;
  margin-right: 25px;
}
.css-contenido {
  text-align: center;

  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.css-footer {
  margin-left: 40%;
  margin-bottom: 10%;
}
.cursor-pointer {
  cursor: pointer;
}
.text-center {
  text-align: center;
}
.q-row {
  display: flex;
}
.items-center {
  align-items: center;
}
</style>
