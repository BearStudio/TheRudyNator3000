## Documentation

For detailed information on how to use this project, please refer to the [documentation](https://docs.web.start-ui.com). The documentation contains all the necessary information on installation, usage, and some guides.

## Getting Started

```bash
# Duplicate the .env.example file to a new .env file (update variables)
cp .env.example .env
```

### OpenAPI key

- First, create an account on https://platform.openai.com/signup if this is not already the case
- Secondly, you will need an api key to be able to chat with ChatGPT. You can create a new one here: https://platform.openai.com/account/api-keys
- Copy your key in your `.env` file you created before in the `OPENAI_API_KEY` env var
- It is strongly encouraged to setup Usage Limits to manage undesirable spending: https://platform.openai.com/account/billing/limits

### Rebrandly key (optional)

Rebrandly is used to manage clicks tracker in links used in your subjects.

- First, create an account on https://oauth.rebrandly.com/signup
- Secondly, create a new API key: https://app.rebrandly.com/account/api
- Copy the key in your `.env` file, in the `REBRANDLY_KEY` env var

### Start the app

```bash
yarn dev
```

### Storybook

```bash
yarn storybook
```

## Production

### NodeJS (recommended)

```bash
yarn install
yarn storybook:build # Optional: Will expose the Storybook at `/storybook`
yarn build
yarn start
```

### Outils utisés

- dotenv.dotenv-vscode pour cacher vos variables d'environnement
- PAs utilisé, mais vous pouvez vous en inspirer: https://github.com/othneildrew/Best-README-Template (je suis passé par le template fournit par startui)
