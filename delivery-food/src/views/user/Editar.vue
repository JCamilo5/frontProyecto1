<template>
  <div class="wrapper fadeInDown align-self-lg-center ">
    <h1>Actualizar Datos</h1>
    <div class="card-body container align-self-center">
      <form action="">
        <div class="col-md-6 mb-3">
          <label for="validationNombre">Nombre<span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="validationNombre"
            v-model="nombre"
            required
          />
          <div class="invalid-feedback">Es necesario escribir el nombre.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validationLocaliza"
            >Localización<span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="validationLocaliza"
            v-model="localizacion"
            required
          />
          <div class="invalid-feedback">
            Es necesario escribir la Localización.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validationTelefono"
            >Telefono<span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="validationtelefono"
            v-model="telefono"
            required
          />
          <div class="invalid-feedback">
            Es necesario escribir la telefono.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="inputContraseña"
            >Contraseña<span class="text-danger">*</span></label
          >
          <input
            type="password"
            id="inputPassword5"
            class="form-control"
            aria-describedby="passwordHelpBlock"
            v-model="contrasena"
            required
          />
          <div class="invalid-feedback">
            Es necesario escribir la contraseña.
          </div>
          <small id="passwordHelpBlock" class="form-text text-muted">
            Su contraseña debe tener entre 8 a 20 caracteres.
          </small>
        </div>

        <button class="btn btn-primary fadeIn third" type="submit">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Editar",
  data() {
    return {
        nombre: "",
        localizacion: "",
        telefono: "",
        contrasena: "",
        id: String,
    };
  },
  /**
   * Ciclo de vida del componente
   * donde obtiene el parametro id pasado por la url
   */
  created() {
    this.id = this.$route.params.id;
  },
  async mounted() {
    console.log("id en el formulario", this.id);
    if(this.id){
        await this.$apollo
        .query({
        query: require("@/graphql/user/user.gql"),
        variables: {
          id: this.id,
        },
        })
        .then((response) =>{
      this.nombre = response.data.user.contact.edges[0].node.names;
      this.localizacion = response.data.user.contact.edges[0].node.location;
      this.telefono = response.data.user.contact.edges[0].node.telephone;
      this.contrasena = response.data.user.password;
      });
    }
  }
}
</script>
