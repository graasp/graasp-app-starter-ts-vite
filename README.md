# Graasp App React TS Vite Template

This repository hosts the template code for a **Graasp App** written with [Typescript](https://www.typescriptlang.org/) and [React](https://react.dev/). The bundler used is [vitejs](https://vitejs.dev).

## Using this template

### With the Graasp CLI

This template can be used with the [graasp CLI](https://www.npmjs.com/package/@graasp/cli?activeTab=readme) to setup your project in a single line:

```bash
npx @graasp/cli@latest new -s graasp/graasp-app-starter-ts-vite
```

The CLI will ask you a few questions to help you setup your project. It uses sane defaults like deploying using GitHubActions (recommended) suggests an appId and installs the dependencies and initializes the git versioning.

<details >
<summary><h3>Manual Setup</h3></summary>

Should you choose to bootstrap your graasp app manually, you will need to execute the following steps.

#### Cloning the template

First create a copy of this repo using either the `Use this template` button, or clone it using the command line.

With `git`:

```bash
git clone
```

With the [GitHub CLI](https://cli.github.com/):

```bash
gh repo clone graasp/graasp-app-starter-ts-vite
```

#### Adding Workflows

To deploy your app using github actions.

#### Renaming

You will have to look rename

</details>

### GitHub Repo setup

If you choose to deploy your app with the provided GitHubActions workflows you will need to create the following secrets:

- `APP_KEY`: a UUID v4 that identifies your app
- `SENTRY_DSN`: your Sentry url to report issues and send telemetry

## Installation

## Running the app

Create a `.env.development` file with the following content:

```bash
VITE_PORT=3005
VITE_API_HOST=localhost
VITE_MOCK_API=true
VITE_GRAASP_APP_KEY=45678-677889
VITE_VERSION=latest
```

## Running the tests

Create a `.env.test` file with the following content:

```bash
VITE_PORT=3333
VITE_API_HOST=localhost
VITE_MOCK_API=true
VITE_GRAASP_APP_KEY=45678-677889
VITE_VERSION=latest

# dont open browser
BROWSER=none
```
