# Algorithm used for `env` file resolution in expo 51 projects

Available env files:

.env.production.local (gitignore)
.env.local (gitignored)
.env.development
.env.production
.env

## Dev Build

### yarn ios

Simulator: Picks up .env.local
Device: Picks up .env.local

### yarn android

Emulator: Picks up .env.local
Device: Picks up .env.local


## Release Build

### yarn ios:prod

Needs SENTRY_* env vars.

Simulator: Picks up .env.production.local
Device: Picks up .env.production.local

### yarn android:prod

Works without SENTRY_* env vars.

Emulator: Picks up .env.production.local
Device: Picks up .env.production.local


## eas build --local

Needs SENTRY_* env vars (worked without SENTRY_ALLOW_FAILURE=true and EAS_LOCAL_BUILD_SKIP_CLEANUP et al.)

### Android production

eas build -p android -e production --local

Emulator: Picks up .env.production (IMPORTANT: Compare against `iOS` behaviour)

Device: Picks up .env.production (IMPORTANT: Compare against `iOS` behaviour)

### iOS preview-sim (Simulator)

eas build -p ios -e preview-sim --local

Picks up .env (by default, since no env overrides are provided in eas.json)

### iOS production (Device)

eas build -p ios -e production --local

"The NODE_ENV environment variable is required but was not specified. Ensure the project is bundled with Expo CLI or NODE_ENV is set.
Proceeding without mode-specific .env"

Picks up .env (by default, since no env overrides are provided in eas.json as mentioned in the warning/error above)


## eas build (remote)

Doesn't need SENTRY_* etc. (since they're set as `EAS` secrets on the `expo` servers).

### Android production

eas build -p android -e production

Emulator: Picks up .env.production (IMPORTANT: Compare against `iOS` behaviour)
Device: Picks up .env.production (IMPORTANT: Compare against `iOS` behaviour)


### iOS preview-sim (Simulator)

eas build -p ios -e preview-sim

Picks up .env


### iOS production (Device)

eas build -p ios -e production

Picks up .env 


## References

https://docs.expo.dev/build-reference/variables/
https://github.com/bkeepers/dotenv/blob/c6e583a/README.md#what-other-env-files-can-i-use
https://docs.expo.dev/guides/environment-variables/
https://expo.dev/blog/what-are-environment-variables