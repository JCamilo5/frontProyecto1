<template>
  <div class="card bg-cart color-black">
    <img
      src="@/assets/enterprise.jpg"
      class="card-img-top"
      alt="logo establecimiento"
    />
    <div class="card-body container-md">
        <div>
          <b-form-rating class="bg-cart" variant="warning" v-model="valoration" id="rating-sm-no-border" no-border
      readonly></b-form-rating>
        </div>
      <h5 class="card-title font-weight-bold">
        {{ enterprise.name | capitalize }}
      </h5>
      <p class="card-text">{{ enterprise.location | capitalize }}</p>
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
      valoration: 0,
      counter: 0,
    };
  },
  created() {
    this.$apollo
      .query({
        // Consulta
        query: require("@/graphql/comments/allReviews.gql"),
      })
      .then((response) => {
        this.allReviews = response.data.allReviews;
        this.apreciation();
        //this.pages = response.data.allEnterprises.edges.length;
      });
  },
  methods: {
    apreciation() {
      var varaux = 0;
      var average = 0;
      this.counter = 0;
      for (this.counter; this.counter < this.allReviews.edges.length; ) {
        varaux =
          varaux +
          this.aux(this.allReviews.edges[this.counter].node.qualityService);
        varaux =
          varaux +
          this.aux(this.allReviews.edges[this.counter].node.presentation);
        varaux =
          varaux +
          this.aux(this.allReviews.edges[this.counter].node.preparation);
        varaux =
          varaux +
          this.aux(this.allReviews.edges[this.counter].node.ingredients);
        varaux =
          varaux + this.aux(this.allReviews.edges[this.counter].node.price);
        varaux =
          varaux + this.aux(this.allReviews.edges[this.counter].node.textures);
        varaux =
          varaux +
          this.aux(this.allReviews.edges[this.counter].node.cookingPoint);
        average +=(varaux / 7);
        varaux = 0;
        this.counter += 1;
        //this.itemsRatings[this.counter] = varaux;
      }
      this.valoration = average / this.counter;

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
