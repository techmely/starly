import NProgress from "nprogress";

async function onPageTransitionEnd() {
  NProgress.done();
}

export { onPageTransitionEnd };
