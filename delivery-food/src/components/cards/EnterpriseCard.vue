<template>
  <div class="card bg-cart color-black">
    {{apreciation()}}
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
      <span class="fa fa-star "></span>
      <h5 class="card-title font-weight-bold">
        {{ enterprise.name | capitalize }}
      </h5>
      <p class="card-text">{{ enterprise.location | capitalize }} </p>
      <p class="card-text">
        Horario de atención: {{ enterprise.businessHours | capitalize }}
      </p>
      <button v-show="ok" type="button" class="btn btn-success btn-sm mr-4">
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
  data() {
    return {
    //itemsRatins:[],
    ok: localStorage.getItem("existUser"),
    allReviews: Object,
    };
  },
  methods: {
    apreciation() {
      console.log("hola")
      var varaux = 0;
      for (let prop in this.allReviews.edges) {
        console.log("usuario ", prop);

        varaux =
          varaux + this.aux(this.allReviews.edges[prop].node.qualityService);
        varaux =
          varaux + this.aux(this.allReviews.edges[prop].node.presentation);
        varaux =
          varaux + this.aux(this.allReviews.edges[prop].node.preparation);
        varaux =
          varaux + this.aux(this.allReviews.edges[prop].node.ingredients);
        varaux = varaux + this.aux(this.allReviews.edges[prop].node.price);
        varaux = varaux + this.aux(this.allReviews.edges[prop].node.textures);
        varaux =
          varaux + this.aux(this.allReviews.edges[prop].node.cookingPoint);
        varaux = Math.round(varaux / 7);
        console.log("prom", varaux);
        prop+=1;
        //this.itemsRatings[prop] = varaux;
      }
      //this.auxsize=this.itemsRatings.length;
    },
    aux(text) {
      var valor = 1;
      if (text == "BUENO") {
        valor = 5;
      } else if (text == "REGULAR") {
        valor = 3;
      }
      return valor;
    },
  },
  apollo: {
    allReviews: {
      // Consulta
      query: require("@/graphql/comments/allReviews.gql"),
      // Asigna el error a la variable definida en data
      error(error) {
        this.error = JSON.stringify(error.message);
      },
    },
  },
};
</script>

<style scoped>
.name-app {
  color: var(--primary-x);
}
.bg-cart {
  background-color: var(--dark-x);
}

.navbar-orange-text {
  color: var(--orange);
}

.color-black {
  color: white;
}
.checked {
  color: orange;
}
</style>
