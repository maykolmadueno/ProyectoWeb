<template>
  <div class="main-container">
    <div class="left-side">
      <div>Inicia sesión con tu cuenta institucional.</div>
      <div>debe ser de dominio @esan.edu.pe</div>
    </div>

    <div class="right-side">
      <div class="mail-container">
        <img src="src/assets/persona.png" alt="" />
        <input v-model="email" type="text" placeholder="example.esan.edu.pe" />
      </div>
      <div class="pass-container">
        <img src="src/assets/candado.png" alt="" />
        <input v-model="password" type="password" placeholder="password" />
      </div>
      <div class="button-container">
        <button @click="login">INICIAR SESIÓN</button>
        <div>
          ¿No tienes cuenta?
          <router-link to="registroUsuario">Registrate</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods:{
    async login() {
    let url = "http://localhost:5158/api/Usuario/SignIn";
    try {
      const response = await axios.post(url, {
        correo: this.email,
        contra: this.password,
      });
      const usuario = {
        idUsuario: response.data.idUsuario,
        tipo: response.data.tipo,
      };
      localStorage.setItem("usuarioActual", JSON.stringify(usuario));
      this.$q.notify({
          message:
            "Ingreso exitoso",
          color: "positive",
          position: "top",
          timeout: 3000,
        });
      this.$router.push("/Home");
    } catch (error) {
      console.log("Ocurrio un error:" + error);
      if (error.response && error.response.status === 404) {
        this.$q.notify({
          message:
            "Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
      } else {
        this.$q.notify({
          message: "Ocurrió un error. Por favor, inténtalo de nuevo más tarde.",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
      }
    }
  },
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
  margin-bottom: 30px;
  line-height: 70px;
}
.left-side :first-child {
  font-size: 60px;
  font-weight: bold;
}
.left-side :last-child {
  font-size: 25px;
}
/* Right side of the page */
.right-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
}
.right-side input:focus {
  outline: 2px solid white;
}
.mail-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
}
.mail-container img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.mail-container input {
  padding: 15px 20px;
  width: 350px;
  border: 2px solid white;
  border-radius: 40px;
  background-color: transparent;
  text-align: center;
  color: white;
}
.mail-container input::placeholder {
  font-size: 16px;
}
.pass-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
}
.pass-container img {
  width: 40px;
  height: 50px;
  vertical-align: middle;
}
.pass-container input {
  padding: 15px 20px;
  width: 350px;
  border: 2px solid white;
  border-radius: 40px;
  background-color: transparent;
  text-align: center;
  color: white;
}
.pass-container input::placeholder {
  font-size: 16px;
}
.button-container button {
  border: 4px solid white;
  padding: 10px 20px;
  width: 200px;
  font-weight: bold;
  border-radius: 40px;
  background-color: transparent;
  color: white;
  margin-left: 45px;
  margin-top: 15px;
  cursor: pointer;
  margin-bottom: 15px;
}
.button-container div {
  margin-left: 40px;
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
</style>
