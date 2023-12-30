<template>
  <header id="header">
    <header id="header">
      <div data-header-preceding>
        <div data-glow />
        <div data-glow-edge />
      </div>
      <div data-header-wrapper>
        <div class="relative tml-container flex items-center py-2">
          <div id="logo" class="mr-8">
            <a href="/" class="flex items-center">
              <img loading="eager" fetchpriority="high" src="/Logo.png" width={40}
                alt="Techmely logo" />
            </a>
          </div>
          <div id="desktop-header-nav" class="relative hidden grow md:flex md:justify-center)">
            <nav class="menu-nav">
              <ul class="flex flex-center gap-4">
                <NavItem v-for="item in navItems" :key="item.name" :is-dropdown="item.isDropdown"
                  :name="item.name" :href="item.href" @item-click="item.onItemClick" />
              </ul>
            </nav>
          </div>
          <div id="mobile-header-nav" class="relative flex md:hidden items-center w-full">
            Nav Mobile
          </div>
          <div id="header-nav-actions" class="space-x-2">
            <div>
              <!-- <img
               width={30}
               height={30}
               src={authState.user?.photoURL || ""}
               alt={authState.user?.displayName || ""}
               class="rounded-full"
             /> -->
            </div>
            <div v-if="!isLoggedIn">
              <Button as="a" variant="link" href="/login"
                class="py-2 px-4 hover:bg-gray-100/90 rounded-md">
                {{ t.headerLogin() }}
              </Button>
              <Button as="a" variant="default"
                href="/get-started?utm_source=techmely&utm_medium=home&utm_campaign=Button">
                {{ t.headerGetStarted() }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  </header>
</template>

<script setup lang="ts">
import * as t from '#modules/locales/paraglide/messages'
import NavItem from './NavItem.vue';

const navItems = [
  {
    name: t.headerNav0(),
    href: "/feed",
  },
  {
    name: t.headerNav1(),
    href: "/discussions",
  },
  {
    name: t.headerNav2(),
    href: "/explore",
  },
  {
    name: t.headerNav3(),
    href: "/playground",
  },
  {
    name: t.headerNav4(),
    isDropdown: true,
    onItemClick: () => { },
  },
];

const isLoggedIn = ref(false)
</script>


