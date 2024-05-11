# Techmely

<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/techmely/techmely">
   <img src="https://i.ibb.co/3zBkRpd/LogoX300.png" alt="Logo">
  </a>

  <h3 align="center">Make your dreams come true easier with Techmely
</h3>

  <p align="center">
    The open-source Medium, LinkedIn and Udemy.
    <br />
    <a href="https://techmely.com"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://chat.techmely.com">Discord</a>
    ·
    <a href="https://techmely.com">Website</a>
    ·
    <a href="https://github.com/techmely/techmely/issues">Issues</a>
    ·
    <a href="https://roadmap.techmely.com">Roadmap</a>
  </p>
</p>

<p align="center">
   <a href="https://chat.techmely.com"><img src="https://img.shields.io/badge/Discord-chat.techmely.com-%234A154B" alt="Join Techmely Discord"></a>
   <a href="https://status.techmely.com"><img height="20px" src="https://betteruptime.com/status-badges/v1/monitor/a9kf.svg" alt="Uptime"></a>
   <a href="https://github.com/techmely/techmely.com/stargazers"><img src="https://img.shields.io/github/stars/harrytran998/techmely" alt="Github Stars"></a>
   <a href="https://github.com/techmely/techmely.com/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-purple" alt="License"></a>
   <a href="https://github.com/techmely/techmely/pulse"><img src="https://img.shields.io/github/commit-activity/m/harrytran998/techmely" alt="Commits-per-month"></a>
   <a href="https://techmely.com/pricing"><img src="https://img.shields.io/badge/Pricing-Free/Premium-brightgreen" alt="Pricing"></a>
   <a href="https://hub.docker.com/r/harrytran998/techmely"><img src="https://img.shields.io/docker/pulls/harrytran998/techmely"></a>
   <a href="https://youtube.com/@techmely"><img src="https://img.shields.io/youtube/channel/subscribers/UCg3EWZXQK0bnbQISG50Nwfg"></a>
   <a href="https://techmely.com/design/figma"><img src="https://img.shields.io/badge/Figma-Design%20System-blueviolet"></a>
   <a href="https://contributor-covenant.org/version/1/4/code-of-conduct/ "><img src="https://img.shields.io/badge/Contributor%20Covenant-1.4-purple" /></a>
   <a href="https://console.algora.io/org/techmely/bounties?status=open"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fconsole.algora.io%2Fapi%2Fshields%2Ftechmely%2Fbounties%3Fstatus%3Dopen"/></a>
</p>

## Business Docs overview

### Tech docs overview

This project build with all my loves + the supportive friends, especially my master [HieuHani](https://github.com/hieuhani).

### Frontend

- 🧩 **Components**: Use @techmely/ui packages with Radix UI
- 🪩 **Web**: Use Vite & React & Tanstack Query for the Dx perfect
- **Desktop**: Build with [Tauri](https://tauri.app/)
- **Mobile**: Use Flutter for performance
- Leverage **Web Assembly** and **WebGPU** to handle 3D models
- **Animation**: Using ThreeJs, GSap and Swup for smooth transition/animation

### Backend

- **AI**: Support GPT models to help user write/copy easier!
- Use [**Hono**](https://hono.dev/) server to create API/Cache/Proxy
- **Database**: Use [**CockroachDB**](https://www.cockroachlabs.com/) to optimize system cost on FREE-tier
- Use [Stripe](https://stripe.com/en-hk) for **payments**, unified API for one-off & subscription billing methods for Stripe
- **Notification**: Use PWA to handle Web Push notis, SMS and webhooks
- **Queue**: Handle the heavy workload on the background(client/server)
- [**Kysely**](https://kysely.dev/): Query builder powerful, really type-safe
- [**Realtime Collaboration**](https://dxos.org/): Use CRDT-Driven mindset, and based on [BlockSuite](https://github.com/toeverything/blocksuite) to create realtime editing and painting whatever you want!
- [**Kibana Search Engine**](https://www.elastic.co/kibana) smart searching, advanced filtering & sorting, pagination, headless UI
- **Storage**: Use [UnStorage](https://unstorage.unjs.io) for all environments(Browser, Worker)
- **Validation**: Use [Valibot](https://github.com/fabian-hiller/valibot) for validate all the form, schema and whatever we need to validate!
- **Cache**: Use [BentoCache](https://github.com/Julien-R44/bentocache) for mutiple cache layer, like Im-mem cache, redis, DynamoDB, and more—serverless
- **AxiomJs** all you need to debug, log & analyze in production

### Cloud

- **Server** local development server & production-ready servers out-of-the-box
- **Serverless** on-demand, auto-scaling, zero maintenance
- **CDN** zero-config, low-latency, request life-cycle hooks, optimized request compressions (Brotli & gzip)
- **Domain** version-controlled & zero-config domain management (e.g. DNS management)
- **AI** fine-tune a foundational model using your application data
- **AWS** startup program: Infrastructure as Code version-controlled cloud infrastructure(Up to $100,000 USD AWS Activate credits)

### CI/CD

_Focus on coding, not publishing._

- Use Gitops for automating deploy + config with [ArgoCD](https://argoproj.github.io/cd/) + [KubeSphere Container Platform](https://kubesphere.io/) + [Helm charts](https://helm.sh/)
- Automatically release process with Github Action
- Have a lot of Bot/CLI(Rabbit AI, CodeQL, LGTM, KnipJs, BiomeJs...) + Checklist Guideline to help project always in high quality
- Production deployments—zero-setup push-to-deploy
- Zero Downtime deploy with confidence using a zero-downtime deployment strategy
- Release Manager libraries (component & function) auto-published to npm, git helpers, and more

### Development Experiences

- Use `techmely` CLI write in RUST to automate all the tasks we needs in this project
- Use [**Consul**](https://www.consul.io/) for centralize the config & enviroment for cross-team and cross-environment
- Leverage the [**UnJs**](https://unjs.io/) ecosystem to have some incredible features like _Auto Import_ and _Framework Agnostic_
- Use **Git Workflow** + **Semantic commit** + **Rabbit AI** to have great commit + review code!
- **Spell checker** will notified once there had typos
- Have a lot of **Utilities collections** like **VueUse** and **@techmely/utils** for handling/transforming data
- **Testing** - All feature have Unit + UI + e2e testing(mocking DB)
- Code Snippets say goodbye to the boilerplate
- Team Management manage your team & their permissions

This project mainly write with React Typescript + Flutter + Rust, so you should learn it to contribute easier 🌷

### Setup + Run projects

Go to document "apps/handbook/3.products/1.techmely.md" or `https://www.teams.techmely.com/products/techmely`
