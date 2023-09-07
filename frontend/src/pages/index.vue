<template>
  <Title>Home</Title>

  <div
    class="mx-auto flex w-full max-w-screen-lg gap-2 px-2 leading-relaxed lg:gap-4 lg:px-0"
  >
    <LazyTheAside>
      <LazyAsideLink
        aria-label="Welcome"
        to="/"
        icon-name="material-symbols:login"
      >
        Welcome
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Software: Use Case"
        to="/quiz/software/use-case"
        icon-name="mdi:poll"
      >
        Software: Use Case
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Computer knowledge"
        to="/quiz/computer-knowledge"
        icon-name="ic:round-monitor"
      >
        Computer knowledge
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Linux and You"
        to="/quiz/linux-and-you"
        icon-name="codicon:terminal-linux"
      >
        Linux and You
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Installation Defaults"
        to="/quiz/installation-defaults"
        icon-name="material-symbols:checklist-rtl"
      >
        Installation Defaults
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Hardware support"
        to="/quiz/hardware-support"
        icon-name="bi:gpu-card"
      >
        Hardware support
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Source for help"
        to="/quiz/source-for-help"
        icon-name="material-symbols:question-mark"
      >
        Source for help
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="User experience"
        to="/quiz/ux"
        icon-name="simple-icons:windows"
      >
        User experience
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Distributions: Price"
        to="/quiz/distributions/price"
        icon-name="bi:currency-dollar"
      >
        Distributions: Price
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Distributions: Scope"
        to="/quiz/distributions/scope"
        icon-name="fa6-solid:box-open"
      >
        Distributions: Scope
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Distributions: Ideology"
        to="/quiz/distributions/ideology"
        icon-name="ri:open-source-fill"
      >
        Distributions: Ideology
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Distributions: Privacy"
        to="/quiz/distributions/privacy"
        icon-name="mdi:shield-check"
      >
        Distributions: Privacy
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Administration"
        to="/quiz/administration"
        icon-name="clarity:administrator-solid"
      >
        Administration
      </LazyAsideLink>
      <LazyAsideLink
        aria-label="Software: Updates"
        to="/quiz/software/updates"
        icon-name="material-symbols:browser-updated"
      >
        Software: Updates
      </LazyAsideLink>

      <button
        class="mt-auto flex items-center justify-center gap-2 border border-black bg-white p-2 lg:mt-4"
        aria-label="Show Results"
      >
        <Icon name="carbon:result" size="1.1rem" class="lg:opacity-60" />
        <span class="hidden p-1 lg:block">Show Results</span>
      </button>
    </LazyTheAside>

    <main class="w-full min-w-0 bg-white px-4 py-4 lg:px-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
