<template>
  <div>
    <LayoutSidebarUser>
      <slot />
    </LayoutSidebarUser>
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import LayoutSidebarUser from "~/components/layouts/LayoutSidebarUser.vue";
</script>
