<template>
  <picture>
    <img v-bind="props" />
  </picture>
</template>

<script setup lang="ts">
import type { ImgHTMLAttributes, SourceHTMLAttributes } from 'vue';

interface Props extends ImgHTMLAttributes {
  avif?: SourceHTMLAttributes;
  webp?: SourceHTMLAttributes;
  src: string;
  importance?: "low" | "high";
  imageWidth?: number | string;
  imageHeight?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  decoding: 'async',
  loading: 'lazy',
  fetchpriority: 'low'
})

// interface Props extends JSX.ImgHTMLAttributes<HTMLImageElement> {
//   avif?: JSX.SourceHTMLAttributes<HTMLSourceElement>;
//   webp?: JSX.SourceHTMLAttributes<HTMLSourceElement>;
//   src: string;
//   importance?: "low" | "high";
//   imageWidth?: number | string;
//   imageHeight?: number | string;
// }

// const ImagePreset: Component<Props> = ({
//   src,
//   avif,
//   webp,
//   width = "100%",
//   height = "100%",
//   decoding = "async",
//   loading = "lazy",
//   fetchpriority = "low",
//   alt,
//   ...props
// }) => {
//   const imagePath = (type: string) => {
//     const imgExtension = src.split(".").pop();
//     return imgExtension ? src.replace(imgExtension, type) : src;
//   };

//   return (
//     <picture>
//       {/* We disable avif here to preload webp image - cover at least 90% browser/device of people  */}
//       {/* <source srcset={imagePath('avif')} {...avif} type="image/avif" /> */}
//       <source srcset={imagePath("webp")} {...webp} type="image/webp" />
//       {/* biome-ignore lint/a11y/useAltText: Already have alt */}
//       <img
//         loading={loading}
//         src={src}
//         alt={alt}
//         fetchpriority={fetchpriority}
//         width={width}
//         height={height}
//         decoding={decoding}
//         {...props}
//       />
//     </picture>
//   );
// };

// export default ImagePreset;

</script>
