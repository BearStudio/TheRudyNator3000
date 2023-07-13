<h1 align="center"><img style="object-fit: contain; max-height: 600px;" src="assets/thumbnail.png" alt="Start UI Web" /></h1>

TheRudyNator3000™ is an AI powered app that will allow you to generate responses that promotes a subject you love to spammers (because why not ?)


## Starter Documentation

This project was initiated using StartUI [web] starter. If you need more details, please see the [documentation](https://docs.web.start-ui.com). It contains all the necessary information on installation, usage, and some guides.

## Getting Started

```bash
# Duplicate the .env.example file to a new .env file (update variables)
cp .env.example .env
```

### Adding the OpenAPI key (needed for ChatGPT)

- First, create an account on https://platform.openai.com/signup if this is not already the case
- Secondly, you will need an api key to be able to chat with ChatGPT. You can create a new one here: https://platform.openai.com/account/api-keys
- Copy your key in your `.env` file you created before in the `OPENAI_API_KEY` env var
- It is strongly encouraged to setup Usage Limits to manage undesirable spending: https://platform.openai.com/account/billing/limits

### Rebrandly key (needed to track links clicks) 


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

### Used tools, references or tips for this project and the conference

- dotenv.dotenv-vscode to hide env vars (usefull for meetups and streams)
- Not used here, but if you need inspiration for a README see: https://github.com/othneildrew/Best-README-Template
- startui
- conf startui codeurs en seine Youtube: Starter dont je suis le héros - Ivan Dalmet & Quentin Lerebours https://www.youtube.com/watch?v=5yk34hF40Ok
- La jungle des licences open source - Jean-Michael Legait https://www.youtube.com/watch?v=8WwTe0vLhgc
- “Le lieu le plus dangereux de France - quickie 01” -  e-penser https://www.youtube.com/watch?v=lg2hFq9RlYM
- “Seriez-vous prêt à sauter d’un avion sans parachute ?” , Par Marc Gozlan https://www.lemonde.fr/blog/realitesbiomedicales/2018/12/15/seriez-vous-pret-a-sauter-dun-avion-sans-parachute-%E2%80%A8/
- Video games: The quest for smart dumbness (Laurent Victorino) https://www.youtube.com/watch?v=Kc8VO97ukB8&t=1100s
- https://whimsical.com/



