<template>
  <div class="card" style="width: 18rem">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuIx3QcxgCN9QLGXgcvhoPdyq1Tl1XNbaUhQ&usqp=CAU" class="card-img-top" alt=""/>
    <div class="card-body">
      <h5 class="card-title">{{ enterprise.name | capitalize }}</h5>
      <p class="card-text">{{ enterprise.location | capitalize }}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnterpriseCard",
  props: {
    enterprise: Object,
  },
};
</script>

<style>

</style>
