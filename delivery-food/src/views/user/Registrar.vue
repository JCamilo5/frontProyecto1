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
        >Registrar con Google</GoogleLogin
      >
      <a></a>
    </form>
    <button type="submit" class="btn btn-outline-secondary">Volver</button>
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
          alert("El correo ya ha sido usado por otra persona!!");
          console.log("El correo ya ha sido usado por otra persona");
        }
      } else {
        alert("Las contraseñas no coinciden");
        console.log("Las contraseñas no coinciden");
      }
    },
    onSuccess(googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
      this.nombre = googleUser.getBasicProfile().Ue;
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
