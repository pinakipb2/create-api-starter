<p align="center">
  <a href="https://www.npmjs.com/package/create-api-starter">
  <picture>
    <img src="./js/src/public/favicon.ico" height="128">
  </picture>
    <h1 align="center">create-api-starter</h1>
  </a>
</p>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/create-api-starter">
    <img alt="" src="https://img.shields.io/npm/v/create-api-starter.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/pinakipb2/create-api-starter">
    <img alt="" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000">
  </a>
</p>

<p align="center">
Express REST API Starter Package: Essential NPM Package for Kickstarting REST API Development { JS / TS }
</p>

## :man_technologist: Getting Started :woman_technologist:

```
npx create-api-starter@latest
```

![create-api-starter](https://user-images.githubusercontent.com/48859773/207340943-3cbe28f0-4d91-4fa9-9b69-3a87f7f88970.png)

## :sparkles: Features

| Features                |         JS         |         TS         |
| :---------------------- | :----------------: | :----------------: |
| Language Support        | :heavy_check_mark: | :heavy_check_mark: |
| Scaffold Anywhere       | :heavy_check_mark: | :heavy_check_mark: |
| Initialize Git          | :heavy_check_mark: | :heavy_check_mark: |
| Import Statement        | :heavy_check_mark: | :heavy_check_mark: |
| Custom Favicon          | :heavy_check_mark: | :heavy_check_mark: |
| Logging                 | :heavy_check_mark: | :heavy_check_mark: |
| Rate Limiting           | :heavy_check_mark: | :heavy_check_mark: |
| Custom Error Handling   | :heavy_check_mark: | :heavy_check_mark: |
| Nodemon Support         | :heavy_check_mark: | :heavy_check_mark: |
| Serve `public` files    | :heavy_check_mark: | :heavy_check_mark: |
| Barrel Export           | :heavy_check_mark: | :heavy_check_mark: |
| Linting Support         | :heavy_check_mark: | :heavy_check_mark: |
| API Versioning          | :heavy_check_mark: | :heavy_check_mark: |
| Simple Folder Structure | :heavy_check_mark: | :heavy_check_mark: |
| Highly Customizable     | :heavy_check_mark: | :heavy_check_mark: |

## :rocket: Project Structure

Inside of your `create-api-starter` project, you'll see the following folders and files:

### JS

```
.
├── .babelrc
├── .env
├── .eslintrc.json
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── public
    │   └── favicon.ico
    └── v1
        ├── config
        │   └── env.config.js
        ├── controllers
        │   ├── Default.controller.js
        │   └── index.js
        ├── middlewares
        │   ├── Default.middleware.js
        │   └── index.js
        └── routes
            ├── Default.route.js
            └── index.js
```

### TS

```
.
├── .env
├── .eslintrc.json
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── public
│   │   └── favicon.ico
│   ├── types
│   │   └── index.d.ts
│   └── v1
│       ├── config
│       │   └── env.config.ts
│       ├── controllers
│       │   ├── Default.controller.ts
│       │   └── index.ts
│       ├── middlewares
│       │   ├── Default.middleware.ts
│       │   └── index.ts
│       └── routes
│           ├── Default.route.ts
│           └── index.ts
└── tsconfig.json
```

Any static assets, like images, can be placed in the `src/public/` directory.

## :genie: Commands

All commands are run from the root of the project, from a terminal:

| Command            | Action                                             |
| :----------------- | :------------------------------------------------- |
| `npm install`      | Installs dependencies                              |
| `npm run dev`      | Starts local dev server at `http://localhost:5000` |
| `npm run build`    | Build your production site to `./build/`           |
| `npm run start`    | Preview your build locally, before deploying       |
| `npm run lint`     | Shows linting errors                               |
| `npm run lint-fix` | Fixes linting errors                               |
