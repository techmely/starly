<template>
  <footer id="footer" class="py-10">
    <div class="tml-container">
      <div class="grid grid-cols-3">
        <div>
          <a href="/" class="flex items-center">
            <img src="/Logo.png" width={60} alt="Techmely logo" />
          </a>
        </div>
        <div>
          <p class="text-xl mb-3">{{ t.footerAboutTechmely() }}</p>
          <ul data-footer-menus class="space-y-10 text-gray-400">
            <li>
              <a href="/about-us">{{ t.footerAboutUs() }}</a>
            </li>
            <li>
              <a href="https://engineering.techmely.com/">Techmely Engineer</a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/techmely">
                {{ t.footerContact() }}
              </a>
            </li>
            <li>
              <a href="/partnership">{{ t.footerPartnership() }}</a>
            </li>
          </ul>
        </div>
        <div>
          <p class="text-xl mb-3">{{ t.footerPolicy() }}</p>
          <ul data-footer-menus class="space-y-10 text-gray-400">
            <li>
              <a href="/legal/privacy-policy">{{ t.footerPrivacyPolicy() }}</a>
            </li>
            <li>
              <a href="/legal/terms-of-service">{{ t.footerPrivacyTermsOfService() }}</a>
            </li>
            <li>
              <a href="/legal/dmca-policy">{{ t.footerDmcaPolicy() }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import * as t from '#modules/locales/paraglide/messages'
</script>