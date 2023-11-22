<div style="margin-bottom: 20px; display:flex; justify-content: center; align-items: center ">
<img style="text-align: center" src="https://graasp.org/favicon.svg" width=100 >
</div>

# Graasp App Template

This repository hosts the template code for a **Graasp App** written with [Typescript](https://www.typescriptlang.org/) and [React](https://react.dev/). The bundler used is [Vite](https://vitejs.dev).

<div style="gap:10px; display:flex; justify-content: center; align-items: center;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width=50 >
  <span>+</span>
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width=50 >
  <span>+</span>
  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" width=50 >
  <span>=</span>
  <span>❤️</span>
</div>

## Using this template

The recommended way to use this template is with the [Graasp CLI](https://github.com/graasp/graasp-cli) which provides a setup wizard and some convenience tools when creating your project.

Alternatively it is possible to create a new Github repo from this project using the Github Template function. In this case the local setup is left as an exercice to the reader.

### With the Graasp CLI

This template can be used with the [graasp CLI](https://www.npmjs.com/package/@graasp/cli?activeTab=readme) to setup your project in a single line:

```bash
npx @graasp/cli@latest new -s graasp/graasp-app-starter-ts-vite
```

The CLI will ask you a few questions to help you setup your project. It suggests sane defaults:

- Deploying using GitHubActions (recommended)
- Provide an appId
- Auto-install project dependencies
- Initialize a local git repository

<details >
<summary><h3>Directly from GitHub</h3></summary>

Should you choose to bootstrap your graasp app manually, you will need to execute the following steps.

#### Cloning the template

Get a copy of this repo.

##### Using the Template button

Click on the `Use this template` button. For more instructions head over to the [GitHub Docs on Using a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

##### Clone from the command line

With `git`:

```sh
git clone
```

With the [GitHub CLI](https://cli.github.com/):

```bash
gh repo clone graasp/graasp-app-starter-ts-vite
```

#### Adding Workflows

To deploy your app using github actions.

#### Renaming

You will have to look for the `Graasp App Template` string in yours project files and rename it to your project name

</details>

### GitHub Repo setup

If you choose to deploy your app with the provided GitHubActions workflows you will need to create the following secrets:

- `APP_ID`: a UUID v4 that identifies your app for deployment
- `APP_KEY`: a UUID v4 that authorizes your app with the Graasp API
- `SENTRY_DSN`: your Sentry url to report issues and send telemetry

## Installation

## Running the app

Create a `.env.development` file with the following content:

```bash
VITE_PORT=3005
VITE_API_HOST=http://localhost:3000
VITE_ENABLE_MOCK_API=true
VITE_GRAASP_APP_KEY=45678-677889
VITE_VERSION=latest
```

## Running the tests

Create a `.env.test` file with the following content:

```bash
VITE_PORT=3333
VITE_API_HOST=http://localhost:3636
VITE_ENABLE_MOCK_API=true
VITE_GRAASP_APP_KEY=45678-677889
VITE_VERSION=latest

# dont open browser
BROWSER=none
```
