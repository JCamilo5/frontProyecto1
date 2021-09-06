<template>
  <div class="card bg-cart color-black">
    <img
      src="@/assets/enterprise.jpg"
      class="card-img-top"
      alt="logo establecimiento"
    />
    <div class="card-body container-md">
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <h5 class="card-title font-weight-bold">{{ enterprise.name | capitalize }}</h5>
      <p class="card-text ">{{ enterprise.location | capitalize }}</p>
      <p class="card-text ">Horario de atención: {{ enterprise.businessHours | capitalize }}</p>
      <button v-show="ok"
            type="button"
            class="btn btn-success btn-sm mr-4"
          >
            Hacer Pedido
          </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnterpriseCard",
  props: {
    /**
     * Objeto establecimiento enviado
     * como prop desde una vista
     */
    enterprise: Object,
  },
    data: () => ({
      ok: localStorage.getItem("existUser"),
     }),
};
</script>

<style scoped>
.name-app{
  color:var(--primary-x)
}
.bg-cart {
  background-color: var(--dark-x);
}

.navbar-orange-text {
  color: var(--orange);
}

.color-black{
  color:white;
}
.checked {
        color: orange;
 }   
</style>
