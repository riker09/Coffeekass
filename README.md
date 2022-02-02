# Coffeekass

This is a playground web application to get myself familiar with Angular and PrimeNG (primarily).

## Prerequisites

* Firebase Emulators require a Java environment. I'm using OpenJDK `v17.x`
* NodeJS `v12.x` or later. Tested with `v16.13.2`
* NPM `v7.x` or later. Tested with `v8.1.2`

> Node and NPM can be obtained via [`nvm`](https://github.com/nvm-sh/nvm).

## Setup

1. Clone this repo (*d'uh!*)
2. Install dependencies: `npm ci --no-audit --no-fund`
3. Install `firebase-tools`: `npm i -g firebase-tools@9.9.0` (Please note that while `v10.x` is available it has some blocking issues)
4. Start emulators: `firebase emulators:start --only auth,firestore,functions,storage`
5. Run frontend: `npm run frontend`


## Firebase Emulators

```bash
# Import on startup
firebase emulators:start --only auth,firestore,functions,storage --import firestore/data/default

# Import on startup, export when closing
firebase emulators:start --only auth,firestore,functions,storage --import firestore/data/default --export-on-exit

# Export (while emulators are running)
firebase emulators:export firestore/data/__mydata__
```

> Please note: Exporting stored files from Firebase Storage is currently *not* supported.
