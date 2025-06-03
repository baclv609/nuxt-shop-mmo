<template>
  <LayoutSidebar>
    <slot />
  </LayoutSidebar>
</template>

<script setup>
import LayoutSidebar from "~/components/layouts/LayoutSidebar.vue";
definePageMeta({ layout: "admin", middleware: ["admin"], ssr: false });
</script>
