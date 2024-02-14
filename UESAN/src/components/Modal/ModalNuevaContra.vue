<!-- CambiarContrasenaModal.vue -->
<template>
  <div class="modal" v-if="mostrar">
    <div class="modal-content">
      <p class ="question">¿Cambiar contraseña del Usuario?</p>
      <input type="password" v-model="nuevaContrasena" placeholder="Nueva contraseña">
      <div class="modal-actions">
        <button @click="confirmar">Confirmar</button>
        <button @click="cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mostrar: {
      type: Boolean,
      required: true
    },
    onConfirmar: {
      type: Function,
      required: true
    },
    onCancelar: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      nuevaContrasena: ''
    };
  },
  methods: {
    confirmar() {
      this.onConfirmar(this.nuevaContrasena);
    },
    cancelar() {
      this.onCancelar();
    }
  }
};
</script>

<style scoped>
/* Estilos del modal (puedes personalizarlos según tus necesidades) */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.modal-actions {
  margin-top: 20px;
  text-align: right;
}

button {
  margin-left: 10px;
}

.question {
  color: black; /* Cambia el color del texto a negro */
}

</style>
