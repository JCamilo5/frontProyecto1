<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label-for="input-1"
        description="No se si va el email."
      >Email:<span class="text-danger">*</span>
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2">Nueva contraseña:
        <span class="text-danger">*</span>
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="********"
          required
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label-for="input-3">Confirmar contraseña:
        <span class="text-danger">*</span>
        <b-form-input
          id="input-3"
          v-model="form.name"
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
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
