import type { CardCraftProps } from "./components/HomeHero/Portfolio/CardCraft";

export { data };
export type HomeData = Awaited<ReturnType<typeof data>>;

const showcases: CardCraftProps[] = [
  {
    id: "",
    title: "",
    description: "",
    isPublish: true,
    file: {
      metadata: {
        type: "",
        size: 0,
        name: "",
        url: "",
      },
    },
    link: "",
    authorName: "",
    actionText: "",
    createdAt: "",
  },
];

async function data() {
  return {
    showcases,
  };
}
