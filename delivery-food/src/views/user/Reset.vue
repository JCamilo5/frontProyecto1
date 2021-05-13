<template>
  <div class="jumbotron">
    <h1 class="display-4">Cambia tu contraseña</h1>
    <hr class="my-4" />
    <form v-on:submit.prevent="editPassword()">
      <div>
        <label for="validationCustom01">Nueva contraseña</label>

        <b-form-input
          type="password"
          id="feedback-user"
          class="form-control"
          :state="validation"
          name="contrasena"
          placeholder="********"
          v-model="contrasenaN"
          required=""
        ></b-form-input>
        <b-form-invalid-feedback :state="validation">
          La contraseña debe tener entre 5 y 12 caracteres.
        </b-form-invalid-feedback>
      </div>
      <div>
        <label for="validationCustom02">Confirmar contraseña</label>
        <b-form-input
          type="password"
          id="contrasena"
          class="form-control"
          :state="iguales"
          name="contrasena"
          placeholder="********"
          v-model="contrasena"
          required=""
        ></b-form-input>
        <b-form-text id="password-help-block">
          La contraseña debe tener entre 5 y 12 caracteres
        </b-form-text>
        <b-form-invalid-feedback :state="iguales">
          Las contraseñas no son iguales.
        </b-form-invalid-feedback>
      </div>
      <br />
      <center>
        <input type="submit" class="btn boton" value="Restablecer contraseña" />
      </center>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      contrasenaN: "",
      contrasena: "",
      show: true,
      error_msg: "",
    };
  },
  methods: {
    makeToast(variant = null, title, info, tiempo) {
      this.$bvToast.toast(info, {
        title: title,
        autoHideDelay: tiempo,
        variant: variant,
        solid: true,
      });
    },
    async editPassword() {
      if (this.iguales) {
        await this.$apollo
          .mutate({
            // Establece la mutación de editar
            mutation: require("@/graphql/client/updateClient.gql"),
            // Define las variables
            variables: {
              id: this.id,
              password: this.contrasenaN,
            },
            // Actualiza el cache de GraphQL para visualizar la eliminación
            // al momento de cargar la vista
            refetchQueries: [
              {
                query: require("@/graphql/user/allUsers.gql"),
                variables: {
                  id: this.id,
                },
              },
            ],
          })
          // El método mutate devuelve una promesa
          // que puede usarse para agregar más logica
          .then((response) => {
            console.log("actualización de contrasenia:", response.data);
            this.$router.push({ name: "ExampleList" }).then(() => {
              this.makeToast(
                "success",
                "Actualizada",
                "La contraseña ha sido actualizada",
                3000
              );
            });
          });
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.id = this.id + "=";
  },
  computed: {
    validation() {
      if (this.contrasenaN.length > 0) {
        return this.contrasenaN.length > 4 && this.contrasenaN.length < 13;
      }
      return null;
    },
    iguales() {
      if (this.contrasena.length > 4) {
        if (this.contrasenaN == this.contrasena) {
          return true;
        } else {
          return false;
        }
      }
      return null;
    },
  },
};
</script>
<style scoped>
.boton {
  background-color: #ff6079;
  border: 1px solid red;
}
.boton:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
