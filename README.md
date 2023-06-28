*Insert great documentation here*

## Setup

- run `yarn` to install
- Create an `.env.local`

```agsl
export AWS_ACCESS_KEY_ID=accesskey
export AWS_SECRET_ACCESS_KEY=secretaccesskey
export ALEXA_USER_ID=amzn1.ask.account.aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee // Optional - add if you want to persist user
export ALEXA_SESSION_ID=SessionID.f11a4f83-09b8-4a93-aaf5-6f43ed78b3cd // Optional - add if you want to persist session
```

- Run `source .env.local` to load the environment variables
- Run `yarn dev` to watch build the project
- Run `yarn debug` to test Alexa
