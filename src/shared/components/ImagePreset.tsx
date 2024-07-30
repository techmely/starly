interface Props extends Omit<NativeImgProps, "src"> {
  avif?: NativeSource;
  webp?: NativeSource;
  src: string;
  fetchpriority?: "low" | "high";
  importance?: "low" | "high";
  useProxy?: boolean;
  imageWidth?: number | string;
  imageHeight?: number | string;
}

export const ImagePreset: React.FC<Props> = ({
  src,
  avif,
  webp,
  width,
  imageWidth = "100%",
  imageHeight = "100%",
  height,
  decoding = "async",
  loading = "lazy",
  fetchpriority = "low",
  importance = "low",
  alt,
  useProxy,
  ...props
}) => {
  const imagePath = (format: string) => {
    if (useProxy) {
      return `https://webp.vike.io/${src}?format=${format}`;
    }
    return `${globalThis.runtimeEnv.VITE_HOST}${src}?format=${format}`;
  };

  return (
    <picture>
      <source srcSet={imagePath("avif")} {...avif} type="image/avif" />
      <source srcSet={imagePath("webp")} {...webp} type="image/webp" />
      {/* biome-ignore lint/a11y/useAltText: We need to ignore here */}
      <img
        loading={loading}
        src={src}
        alt={alt}
        aria-label={alt}
        // @ts-expect-error - TS doesn't know about these attributes
        fetchpriority={fetchpriority}
        importance={fetchpriority}
        width={imageWidth}
        height={imageHeight}
        decoding={decoding}
        {...props}
      />
    </picture>
  );
};

type NativeImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

type NativeSource = React.DetailedHTMLProps<
  React.SourceHTMLAttributes<HTMLSourceElement>,
  HTMLSourceElement
>;
