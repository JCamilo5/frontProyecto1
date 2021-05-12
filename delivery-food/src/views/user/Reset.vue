<template>
  <div>
    <b-form v-on:submit.prevent="editPassword()" v-if="show">
      <b-form-group id="input-group-2" label-for="input-2">Nueva contraseña:
        <span class="text-danger">*</span>
        <b-form-input
          id="input-2"
          v-model="contrasena"
          placeholder="********"
          required
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label-for="input-3">Confirmar contraseña:
        <span class="text-danger">*</span>
        <b-form-input
          id="input-3"
          v-model="contrasenaN"
          placeholder="********"
          required
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Restablecer contraseña</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id:"",
        contrasenaN:"",
        contrasena:"",
        show: true
      }
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
      await this.$apollo
        .mutate({
          // Establece la mutación de editar
          mutation: require("@/graphql/client/updateClient.gql"),
          // Define las variables
          variables: {
            id: this.id,
            password : this.contrasenaN,
          },
          // Actualiza el cache de GraphQL para visualizar la eliminación
        // al momento de cargar la vista
        refetchQueries: [
          { query: require("@/graphql/user/allUsers.gql"),
            variables:{
              id: this.id
            },

          },
        ],
        })
        // El método mutate devuelve una promesa
        // que puede usarse para agregar más logica
        .then((response) => {
          console.log("actualización de contrasenia:", response.data);
          this.contrasena=this.contrasenaN;
          this.makeToast(
                  "success",
                  "Actualizada",
                  "La contraseña ha sido actualizada",
                  3000
                );
        });
    },
    },
    created() {
    this.id = this.$route.params.id;
    this.id = this.id+"="
    console.log("Id: ",this.id)
  },
  }
</script>
