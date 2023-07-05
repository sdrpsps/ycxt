<template>
  <div class="flex min-h-screen min-w-[1024px] flex-col bg-gray-100">
    <MyHeader />
    <main class="container m-auto mt-20">
      <slot />
    </main>
    <MyFooter />
  </div>
</template>
