<template>
  <div class="wrapper fadeInDown align-self-lg-center ">
    <h1>Actualizar Datos</h1>
    <div class="card-body container align-self-center">
      <form action="">
        <div class="col-md-6 mb-3">
          <label for="validationNombre"
            >Nombre<span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="validationNombre"
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
            required
          />
          <div class="invalid-feedback">
            Es necesario escribir la contraseña.
          </div>
          <small id="passwordHelpBlock" class="form-text text-muted">
            Su contraseña debe tener entre 8 a 20 caracteres.
          </small>
        </div>        

        <button class="btn btn-primary" type="submit">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "editar",
  data() {
    return {
      datosPersonales: {
        nombre: "",
        localizacion: "",
        telefono: "",
        contraseña: "",
      },
    };
  },
};
</script>
