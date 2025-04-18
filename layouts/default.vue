<template>
  <div>
    <Header />
    <main class="container mx-auto py-8">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>
