<script setup>
//Vue Clean Check components
import MaterialButton from "@/components/MaterialButton.vue";
</script>
<template>
  <section class="py-7 m-3 bg-gray-100">
    <div class="container">
      <div class="row justify-space-between text-center py-2">
        <div class="col-12 mx-auto">
          <MaterialButton
            variant="gradient"
            color="success"
            size="sm"
            class="btn-icon"
          >
            <div class="d-flex align-items-center">
              <i class="material-icons me-2" aria-hidden="true">favorite</i>
              Small
            </div>
          </MaterialButton>

          <MaterialButton
            variant="gradient"
            color="success"
            class="btn-icon mx-2"
          >
            <div class="d-flex align-items-center">
              <i class="material-icons me-2" aria-hidden="true">favorite</i>
              Default
            </div>
          </MaterialButton>

          <MaterialButton
            variant="gradient"
            color="success"
            size="lg"
            class="btn-icon"
          >
            <div class="d-flex align-items-center">
              <i class="material-icons me-2" aria-hidden="true">favorite</i>
              Large
            </div>
          </MaterialButton>
        </div>
      </div>
    </div>
  </section>
</template>
