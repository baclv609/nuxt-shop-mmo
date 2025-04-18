<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold text-blue-600"> ShopOnline </NuxtLink>
      <nav class="flex gap-6">
        <NuxtLink to="/" class="hover:text-blue-600 font-medium">Trang chủ</NuxtLink>
        <NuxtLink to="/products" class="hover:text-blue-600 font-medium"
          >Sản phẩm</NuxtLink
        >
        <NuxtLink to="/cart" class="hover:text-blue-600 font-medium">Giỏ hàng</NuxtLink>
        <NuxtLink to="/account" class="hover:text-blue-600 font-medium"
          >Tài khoản</NuxtLink
        >
      </nav>
    </div>
  </header>
</template>
