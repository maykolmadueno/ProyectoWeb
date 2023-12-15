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
        <!-- <q-btn flat icon="icono-derecha" /> -->
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
        <h2 style="font-weight: bold">DIVISIÓN AUDIOVISUAL DE ESAN LABS</h2>
        <p style="font-size: 40px">Dispuestos. Puntuales. Profesionales.</p>
      </div>
    </q-page-container>

    <!-- Footer -->
    <q-footer elevated class="fondo-negro css-footer">
      <q-toolbar>
        <h4>
          SOLICITA LA COBERTURA AUDIOVISUAL DE UN EVENTO ¡EN TAN SOLO 3 PASOS!
        </h4>
      </q-toolbar>
    </q-footer>

    <!-- <div class="css-footer">
      <h4>SOLICITA LA COBERTURA AUDIOVISUAL DE UN EVENTO</h4>
      <h4>¡EN TAN SOLO 3 PASOS!</h4>
    </div> -->
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
}
.css-footer {
  text-align: center;
  padding-right: 25vh;
  padding-left: 25vh;
  font-weight: bold;
}
</style>
