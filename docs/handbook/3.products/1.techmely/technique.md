# Tech guide

## How to run project

1. Install deps `bun install`
1. Run web site + api with command `bun run dev`
1. Have fun with that.

## How to get the icons for project?

1. Go to `https://icones.js.org/collection/all` and search what you needs.
2. Copy the symbol of icons
3. If your icon just specific for one page --> Create a list icons for that page in `/public/svg` folder --> Add page name, EX: post.svg
4. If your icon is a common icon, can use anywhere in app --> add to the last item on `public/svg/common.svg`
5. Use `SvgUse` component to expose the icon on view

## The decided of technical to fit with the business

1. The width of detail blog post

   - With the research --> We chosen the width is around 70~80 characters depends on the user-device width + The main language is LATIN(Vietnamese + English).
   - So the width is `34rem` to `38rem`.

   Here is some research paper:

   - <https://baymard.com/blog/line-length-readability>

2.

## Thirst party API

- <https://developers.google.com/youtube/v3/docs/?apix=true>

## Deployment

### Self-host Docker Deployment

1. checkout source `git clone https://github.com/techmely/techmely.git`
1. got into new source dir: `cd tech`
1. build Docker image: `docker build .`
1. create local storage directory for settings: `mkdir tml-storage`
1. adjust permissions of storage dir: `sudo chown 911:911 ./tml-storage`
1. start container: `docker-compose up -d`

```sh
git clone https://github.com/techmely/techmely.git
cd techmely
bun run docker.build # build Docker image for all app
bun run docker.storage # create local storage directory + adjust permissions of storage dir
bun run docker.up # Start container - Enjoy
```
