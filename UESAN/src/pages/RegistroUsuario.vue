<template>
  <div class="main-container">
    <div class="left-side">
      <div>Registro de nuevo usuario.</div>
      <div>Llenar todos los campos necesarios para su registro.</div>
    </div>

    <div class="right-side">
      <h3>Registro de usuario</h3>
      <div class="name-container">
        <label for="nombre">Nombre:</label>
        <input type="text" required />
      </div>

      <div class="email-container">
        <label for="email">Correo electrónico:</label>
        <input type="email" required />
      </div>
      <div class="area-container">
        <label for="area">Área:</label>
        <input type="text" required />
      </div>
      <div class="pass-container">
        <label for="password">Contraseña:</label>
        <input type="password" required />
      </div>

      <div class="btn-container">
        <button class="btn-registrarse">Registrarse</button>
        <!-- <div>¿Ya tienes usuario? <a href="">Ingresa</a></div> -->
        <div>
          ¿Ya tienes usuario? <router-link to="/login">Ingresa</router-link>
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
  font-size: 5px;
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
</style>
