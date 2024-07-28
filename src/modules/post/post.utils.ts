export const HTML_EXT = ".html";

export function getPostSlug(post): string {
  return `${post.slug}-${post.id}${HTML_EXT}`;
}
