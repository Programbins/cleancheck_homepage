<script setup>
//Vue Clean Check components
import MaterialButton from "@/components/MaterialButton.vue";
</script>
<template>
  <section class="py-7 m-3 bg-gray-100">
    <div class="container">
      <div class="row justify-space-between text-center py-2">
        <div class="col-6 mx-auto">
          <div class="btn-group" role="group" aria-label="Basic example">
            <MaterialButton variant="contained" color="success"
              >Left</MaterialButton
            >
            <MaterialButton variant="contained" color="success"
              >Middle</MaterialButton
            >
            <MaterialButton variant="contained" color="success"
              >Right</MaterialButton
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
