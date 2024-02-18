<template>
  <div class="main-container">
    <div class="left-side">
      <div>Registro de nuevo usuario</div>
      <div>Llenar todos los campos necesarios para su registro.</div>
    </div>

    <div class="right-side">
      <h3>Registro de usuario</h3>
      <div class="name-container">
        <label for="nombre">Nombre:</label>
        <input v-model = "usuario.nombre" type="text" required />
      </div>

      <div class="email-container">
        <label for="email">Correo electrónico:</label>
        <input v-model = "usuario.correo" type="email" required />
      </div>
      <div class="area-container">
        <label for="area">Área:</label>
        <input v-model = "usuario.area" type="text" required />
      </div>
      <div class="pass-container">
        <label for="password">Contraseña:</label>
        <input v-model = "usuario.contra" type="password" required />
      </div>

      <div class="btn-container">
        <button @click = "login" class="btn-registrarse">Registrarse</button>
        <!-- <div>¿Ya tienes usuario? <a href="">Ingresa</a></div> -->
        <div>
          ¿Ya tienes usuario? <router-link to="/login">Ingresa</router-link>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <!-- Fondo oscuro detrás del modal -->
      <div class="modal-background" @click="cerrarModal"></div>
      <!-- Contenido del modal -->
      <div class="modal-content">
        <!-- Input para ingresar el código -->
        <input v-model="codigoIngresado" class="input" type="text" placeholder="Ingrese el código" :style="{ color: 'white' } ">
        <!-- Botón para confirmar el código -->
        <button @click="confirmarCodigo" class="button">Confirmar</button>
        <button @click="cerrarModal" class="button">Cancelar</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import emailjs from 'emailjs-com';
export default {
  data() {
    return {
      usuario : {
        nombre : "",
        contra: "",
        correo: "",
        area : ""
      },
      showModal : false,
      codigo : null,
      codigoIngresado : "",
    };
  },

methods:{
  async validarIngreso() {
    let url = "http://localhost:5158/api/Usuario/SignUp";
    try {
      const response = await axios.post(url, this.usuario);
      const usuario = {
        idUsuario: response.data.idUsuario,
        tipo: response.data.tipo,
      };
      this.$q.notify({
          message: "La cuenta se creó exitosamente ... :)",
          color: "positive",
          position: "top",
          timeout: 3000,
      });
      localStorage.setItem("usuarioActual", JSON.stringify(usuario));
      this.$router.push("/Home");
    } catch (error) {
      console.log("Ocurrio un error:" + error);
      this.$q.notify({
          message: "Ocurrió un error. Por favor, inténtalo de nuevo más tarde.",
          color: "negative",
          position: "top",
          timeout: 3000,
      });

    }
  },

  async login(){
    if(1==1){
      this.codigo = (Math.floor(Math.random() * 90000) + 10000).toString();
    const datosCorreo = {
        from_name: 'AudioVusuales',
        to_name: this.usuario.nombre, // Nombre del destinatario
        correo: this.usuario.correo,
        password: this.codigo, // Codigo enviado de confirmacion
        };
    this.EnviarCorreo(datosCorreo);
    this.mostrarModal();
    }else{
      this.$q.notify({
          message: "El correo ingresado no cuenta con el dominio @esan.edu.pe",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
    }
  },

  mostrarModal() {
      this.showModal = true;
    },
  cerrarModal() {
      this.showModal = false;
  },
  async confirmarCodigo() {
      if(this.codigo == this.codigoIngresado){
        this.cerrarModal();
        await this.validarIngreso();
      }else{
        this.$q.notify({
          message: "El código ingresado no es valido",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
      }
  },

  EnviarCorreo(datos){
    // Definimos los IDs del servicio y la plantilla de correo
    const serviceID = 'default_service';
    const templateID = 'template_j9wjypb';

      // Enviamos los datos a través de EmailJS
      emailjs.send(serviceID, templateID, datos)
        .then(() => {
          console.log('¡Correo enviado con éxito!');
        })
        .catch((error) => {
          console.error('Error al enviar el correo:', error);
          this.$q.notify({
          message: "Error al enviar el correo, verifica integridad del mismo",
          color: "negative",
          position: "top",
          timeout: 4000,
        });
        });
  },

  verificarCorreo(){
    let expresionRegular = /@esan\.edu\.pe$/;
    if (expresionRegular.test(this.usuario.correo)) {
    return true; // El correo tiene el dominio "@esan.edu.pe"
  } else {
    return false; // El correo no tiene el dominio "@esan.edu.pe"
  }
  }
},


};
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  color: white;
}
.main-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  background-color: black;
  color: white;
  background-image: url("src/assets/fondo-esan.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
/* Left side of the page */
.left-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  row-gap: 20px;
  margin-bottom: 100px;
}
.left-side :first-child {
  font-size: 60px;
  font-weight: bold;
  line-height: 65px;
}
.left-side :last-child {
  font-size: 20px;
}
/* Right side of the page */
.right-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: center;
  justify-content: flex-start;
  /* border: 2px solid red; */
}
.right-side h3 {
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 20px;
}

.name-container,
.email-container,
.area-container,
.pass-container {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 350px;
}
div input {
  width: 100%;
  height: 45px;
  border-radius: 20px;
  background-color: transparent;
  border: 3px solid white;
  color: white;
  padding-left: 20px;
}
div input:focus {
  outline: 2px solid white;
}
div input[type="text"]::placeholder {
  font-size: 14px;
}

.btn-container {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.btn-registrarse {
  border: 4px solid white;
  padding: 10px 20px;
  width: 200px;
  justify-content: center;
  font-weight: bold;
  border-radius: 40px;
  background-color: transparent;
  color: white;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  margin-bottom: 10px;
}
div a {
  color: rgb(236, 128, 128);
  cursor: pointer;
}
div a:hover {
  font-weight: bold;
}
div a:active {
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20%;
}

/* Estilos para el contenido del modal */
.modal-content {
  background-color: black;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

/* Estilos para el input */
.input {
  background-color: black;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

/* Estilos para el botón */
.button {
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
