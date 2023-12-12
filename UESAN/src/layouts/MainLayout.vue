<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container>
      <q-page class="main-layout">
        <!-- Contenido de la página principal -->
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.main-layout {
  /*background-color: #272727; /* Color de fondo para el layout principal */
  background-color: black;
  height: 100%;
  /*width: 100%;*/
}
</style>

<script>
export default {
  //
};
</script>
