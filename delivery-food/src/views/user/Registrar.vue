<template>
  <div>
    <h1>Registro</h1>
    <form>
      <div class="form-group">
        <label for="completeName">Nombre Completo</label>
        <input
          type="text"
          class="form-control"
          id="completeName"
          v-model="nombre"
          required
          aria-describedby="nameComplete"
        />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Número de telefono</label>
        <input
          type="number"
          class="form-control"
          id="phoneNumber"
          v-model="telefono"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Correo electronico</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="correo"
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="password1"
          v-model="password"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword1">Confirmar contraseña</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword1"
          v-model="passwordC"
          required
        />
      </div>
      <div>
        <h3></h3>
      </div>
      <GoogleLogin
        class="buttonText"
        :params="params"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
        >login</GoogleLogin
      >
      <a></a>
      <form v-on:submit.prevent="login">
        <input
          type="submit"
          class="fadeIn fourth"
          @click="$router.push('/Registrar')"
          value="Registrar"
        />
      </form>
      <button type="submit" class="btn btn-outline-secondary">Volver</button>
      <button class="btn btn-outline-secondary">
        <i class="fab fa-google" aria-hidden="true"></i>Registro mediante gmail
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-google"
        viewBox="0 0 16 16"
      >
        <path
          d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
        />
      </svg>
    </form>
    <button @click="comprobar()" type="submit" class="btn btn-outline-primary">
      Registrar
    </button>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
export default {
  name: "Registrar",
  components: {
    GoogleLogin,
  },
  data() {
      return {
        bandera: false,
       nombre: "",
       correo: "",
  //     password: "",
  //     passwordC: "",
     };
  },
  methods: {
    createRegister() {
      console.log(this.email);
      this.$apollo.mutate({
        mutation: require("@/graphql/client/register.gql"),
        variables: {
          names: this.nombre,
          telephone: this.telefono,
          email: this.correo,
          password: this.password,
          lastnames: "dfdfdf",
          location: "dddddd",
        },
      });
      this.$router.push({ name: "login" });
    },
    async checkEmail() {
      await this.$apollo
        .query({
          query: require("@/graphql/user/autentication.gql"),
          variables: {
            email: this.correo,
          },
        })
        .then((response) => {
          if (response.data.allUsers.edges.length == 1){
            this.bandera = false;
          } else {
            this.bandera = true;
          }
        });
    },
    async comprobar() {
      if (this.password == this.passwordC) {
        await this.checkEmail();
        if (this.bandera == true) {
          this.createRegister();
        } else {
          console.log("El correo ya ha sido usado por otra persona");
        }
      } else {
        console.log("Las contraseñas no coinciden");
      }
    },
    onSuccess(googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
      this.correo = googleUser.getBasicProfile().Rt;
      this.google = true;
      this.iniciarSesion();
    },
    onFailure(error) {
      console.log(error);
    },
    // confirmEmail
  },
};
</script>

<style scoped>
.buttonText:hover {
  cursor: pointer;
}
.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 15px;
  font-size: 22px;
  font-weight: lighter;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: "Roboto", sans-serif;

  background: url("https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg")
    transparent 5px 50% no-repeat;
  color: #444;
  width: 250;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
}
</style>
