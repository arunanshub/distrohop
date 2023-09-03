<template>
  <Title>Home</Title>

  <div
    class="mx-auto flex w-full max-w-screen-lg gap-2 px-2 leading-relaxed lg:gap-4 lg:px-0"
  >
    <TheAside>
      <AsideLink to="/" icon-name="material-symbols:login">Welcome</AsideLink>
      <AsideLink to="/quiz/software/use-case" icon-name="mdi:poll">
        Software: Use Case
      </AsideLink>
      <AsideLink to="/quiz/computer-knowledge" icon-name="ic:round-monitor">
        Computer knowledge
      </AsideLink>
      <AsideLink to="/quiz/linux-and-you" icon-name="codicon:terminal-linux">
        Linux and You
      </AsideLink>
      <AsideLink
        to="/quiz/installation-defaults"
        icon-name="material-symbols:checklist-rtl"
      >
        Installation Defaults
      </AsideLink>
      <AsideLink to="/quiz/hardware-support" icon-name="bi:gpu-card">
        Hardware support
      </AsideLink>
      <AsideLink
        to="/quiz/source-for-help"
        icon-name="material-symbols:question-mark"
      >
        Source for help
      </AsideLink>
      <AsideLink to="/quiz/ux" icon-name="simple-icons:windows">
        User experience
      </AsideLink>
      <AsideLink to="/quiz/distributions/price" icon-name="bi:currency-dollar">
        Distributions: Price
      </AsideLink>
      <AsideLink to="/quiz/distributions/scope" icon-name="fa6-solid:box-open">
        Distributions: Scope
      </AsideLink>
      <AsideLink
        to="/quiz/distributions/ideology"
        icon-name="ri:open-source-fill"
      >
        Distributions: Ideology
      </AsideLink>
      <AsideLink to="/quiz/distributions/privacy" icon-name="mdi:shield-check">
        Distributions: Privacy
      </AsideLink>
      <AsideLink
        to="/quiz/administration"
        icon-name="clarity:administrator-solid"
      >
        Administration
      </AsideLink>
      <AsideLink
        to="/quiz/software/updates"
        icon-name="material-symbols:browser-updated"
      >
        Software: Updates
      </AsideLink>

      <button
        class="mt-auto flex items-center justify-center gap-2 border border-black bg-white p-2 lg:mt-4"
        aria-label="Show Results"
      >
        <Icon name="carbon:result" size="1.1rem" class="lg:opacity-60" />
        <span class="hidden p-1 lg:block">Show Results</span>
      </button>
    </TheAside>

    <main class="w-full min-w-0 bg-white px-4 py-4 lg:px-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
