<template>
  <div
    class="prose mx-auto w-full max-w-screen-lg grow px-8 pb-8 text-justify 2xl:px-0"
  >
    <ContentDoc>
      <template #not-found>
        <Title>404</Title>
        <div
          class="not-prose mt-[15vh] flex flex-col items-center gap-4 text-center"
        >
          <h1 class="text-6xl font-semibold">404</h1>
          <p class="text-2xl">The page you are looking for does not exist.</p>
          <NuxtLink to="/">
            <div
              class="mt-4 border border-black bg-white p-4 hover:bg-slate-200"
            >
              Go Back Home
            </div>
          </NuxtLink>
        </div>
      </template>
    </ContentDoc>
  </div>
</template>
