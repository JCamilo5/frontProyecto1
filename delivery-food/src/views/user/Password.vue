<template>
<div class="jumbotron">
  <h1 class="display-4">Recuperación de contraseña</h1>
  <hr class="my-4">
  <form role="form" id="login-recordar" method="post">
      <fieldset>
        <span class="help-block">
         Dirección de correo electrónico que utiliza para iniciar sesión en su cuenta
          <br>
          Le enviaremos un correo electrónico con instrucciones para elegir una nueva contraseña.
        </span>
        <div class="form-group input-group">
          <input class="form-control" placeholder="Email" name="email" v-model="email" type="email" required="">
        </div>
        <button type="submit" @click="recuperarC()" class="btn btn-primary btn-block" id="btn-olvidado">
          Continuar
        </button>
      </fieldset>
    </form>
</div>
</template>

<script>
export default {
  data: () => ({
    email: "",
  }),
  methods:{
    makeToast(variant = null, title, info, tiempo) {
      this.$bvToast.toast(info, {
        title: title,
        autoHideDelay: tiempo,
        variant: variant,
        solid: true,
      });
    },
    async recuperarC(){
      await this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/client/rememberClient.gql"),
          // Define las variables
          variables: {
            email: this.email,
          },
        })
        // El método mutate devuelve una promesa
        // que puede usarse para agregar más logica
        .then((response) => {
          console.log("creación de empresa:", response.data);
          this.makeToast(
                  "success",
                  "¡Recordatorio de contraseña enviado! ",
                  "Consulte su correo electrónico para obtener instrucciones sobre cómo restablecer su contraseña",
                  4000
                );
          this.$router.push({ name: "ExampleList" });
        });
    }
}
}
</script>

<style>

</style>
