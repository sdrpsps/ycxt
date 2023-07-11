<template>
  <div class="flex min-h-screen flex-col bg-gray-100 lg:min-w-[1024px]">
    <MyHeader />
    <main class="container m-auto mt-20">
      <slot />
    </main>
    <MyFooter />
  </div>
</template>
