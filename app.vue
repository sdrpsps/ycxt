<template>
  <NDialogProvider>
    <NMessageProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NMessageProvider>
  </NDialogProvider>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  filter: blur(3px);
}

.page-leave-to {
  opacity: 0;
  filter: blur(3px);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from {
  opacity: 0;
  filter: blur(3px);
}

.layout-leave-to {
  opacity: 0;
  filter: blur(3px);
}
</style>
