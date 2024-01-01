import type { TemplateWrapped } from "vike/dist/esm/node/runtime/html/renderHtml";
import { escapeInject } from "vike/server";

export const AppScriptBody: TemplateWrapped = escapeInject`
<script id="handler-light-mode">
    (()=>{function e(e){window.__theme=e,"dark"===e?document.documentElement.classList.add("dark"):"light"===e&&document.documentElement.classList.remove("dark")}let t;try{t=localStorage.getItem("theme")}catch(a){}window.__setPreferredTheme=a=>{t=a,e(a);try{localStorage.setItem("theme",a)}catch(r){}};let r=t,c=window.matchMedia("(prefers-color-scheme: dark)");r||(r=c.matches?"dark":"light"),e(r),c.addEventListener("change",a=>{t||e(a.matches?"dark":"light")})})();
</script>`;
