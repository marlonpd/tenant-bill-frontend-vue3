<template>
  <!-- footer -->
  <footer class="w-full bg-white px-6 border-t">
    <div
      class="container mx-auto max-w-4xl py-6 flex flex-wrap md:flex-no-wrap justify-between items-center text-sm"
    >
      &copy;2019 LoneStart. All rights reserved.
      <div class="pt-4 md:p-0 text-center md:text-right text-xs">
        <a href="#" class="text-black no-underline hover:underline"
          >Privacy Policy</a
        >
        <a href="#" class="text-black no-underline hover:underline ml-4"
          >Terms &amp; Conditions</a
        >
        <a href="#" class="text-black no-underline hover:underline ml-4"
          >Contact Us</a
        >
      </div>
    </div>
  </footer>
  <!-- /footer -->
</template>

<script lang="ts">
  import { Vue } from 'vue-class-component';

  export default class Footer extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
