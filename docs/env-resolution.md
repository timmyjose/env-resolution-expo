# Algorithm used for `env` file resolution in expo 51 projects

`Debug` vs `Release` is independent of the env profile.

NODE_ENV behaviour = https://blog.logrocket.com/understanding-react-native-env-variables/

yarn android -> development
yarn android:prod -> production

===> Cannot override

Available env files:

.env.production.local (gitignore)
.env.local (gitignored)
.env.development
.env.production
.env

-> 

.env.local (gitgnored)
.env.development
.env.test
.env (with production variables)

+ envs in eas.json for `preview-sim` and `production`.

Final resolution:

.env.local - yarn android and yarn ios (gitignored) (NOTE: `Android` seems susceptible to caching issues - delete `.expo` and retry)
.env.development (as usual)
.env - defaults 

eas.json envs updated for `preview-sim` and `production`

TODO: docs - remove `.expo` directory in case of env vars not getting picked up correctly []


## Dev Build

### yarn ios

Simulator: Picks up value in .env.local [OK]
Device: Picks up value in .env.local [OK]

### yarn android

Emulator: Picks up value in .env.local [OK]
Device: Picks up value in .env.lcoal [OK]


## Release Build

### yarn ios:prod

Needs SENTRY_* env vars.

Simulator: Picks up from .env.local [OK] 
Device: Picks up from .env.local [OK]

### yarn android:prod

Works without SENTRY_* env vars.

Emulator: Picks up from .env.local [OK] (modulo the caching issues mentioned above)
Device: Picks up from .env.local [OK ] (modulo the caching issues mentioned above)


## eas build --local

Needs SENTRY_* env vars (worked without SENTRY_ALLOW_FAILURE=true and EAS_LOCAL_BUILD_SKIP_CLEANUP et al.)

### Android production

eas build -p android -e production --local

Emulator: Picks up .env (`production`) [OK]

Device: Picks up .env (`production`) [OK]

### iOS preview-sim (Simulator)

eas build -p ios -e preview-sim --local : Picks up .env (`production`) [OK]

Picks up .env with warning about NODE_ENV not being specified

### iOS production (Device)

eas build -p ios -e production --local : Picks up on .env (`production`)[OK]

"The NODE_ENV environment variable is required but was not specified. Ensure the project is bundled with Expo CLI or NODE_ENV is set.
Proceeding without mode-specific .env"

Picks up .env with warning about NODE_ENV not being specified


## eas build (remote)

Doesn't need SENTRY_* etc. (since they're set as `EAS` secrets on the `expo` servers).

### Android production

eas build -p android -e production

Emulator: Picks up .env (`production`)[OK]
Device: Picks up .env (`production`)[OK]

### iOS preview-sim (Simulator)

eas build -p ios -e preview-sim : Picks up .env (`production`)[OK]

Picks up .env with warning about NODE_ENV not being specified

### iOS production (Device)

eas build -p ios -e production : Picks up .env (`production`) [OK]

Picks up .env with warning about NODE_ENV not being specified



## References

https://docs.expo.dev/build-reference/variables/
https://github.com/bkeepers/dotenv/blob/c6e583a/README.md#what-other-env-files-can-i-use
https://docs.expo.dev/guides/environment-variables/
https://expo.dev/blog/what-are-environment-variables
https://docs.expo.dev/build-reference/variables/#how-are-naming-collisions-between-secrets-the-env--field-in-easjson-and-env-files-handled
https://blog.logrocket.com/understanding-react-native-env-variables/