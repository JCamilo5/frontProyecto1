<template>
  <div class="row mt-2">
    <div class="col-md-12 col-sm-12">
      <div class="row">
        <div class="col-lg-2">
          <!-- <img :src="image" class="card-img-top" :alt="'logo ' + name" /> -->
          <img
            src="@/assets/enterprise.jpg"
            class="card-img-top"
            :alt="'logo ' + name"
          />
        </div>
        <div class="col-lg-10 col-md-12 col-sm-12 mt-4">
          <h2>
            <b>{{ name | capitalize }}</b>
          </h2>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10 col-md-12 col-sm-12">
          <h4>
            {{ section | capitalize }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Enterprise",
  props: {
    name: String,
    image: String,
    section: String,
  },
  methods: {
    ver() {
      console.log("Ruta recibida: " + this.image);
    },
  },
};
</script>
