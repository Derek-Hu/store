
```sh
npm install
npm start

```

## Deploy
```sh
npm run deploy
```

## Update Block JSON
```sh
npm run fetchJSON
```

## Generate Snapshots
Environment Variables:

`HEADLESS=false` open browser when save screenshots. Default `true`.

`FORCE_UPDATE=true` Re-Generate all component snapshots. Default `false`.

```sh
npm run snapshots
# or
npm run snapshots:debug
```

Images generated in folder `public/screenshots`. 

Blank/Empty images logs in `public/screenshots/empty.json`.

Error logs in `public/screenshots/error.json`.

## Settings for Libaray
`src/service/constant.js#Service`

`url`: remote block json

`selector`: `Object` CSS selector when iterator data `attribute`

`name`: saved filename after download block json

`waitUntil`: puppeteer `waitUntil` option

`viewport`: puppeteer `viewport` option

`runBeforeWaitForSelector`: `function` run in puppeteer browser before element visible. For example, switch languages.

`runInBrowser`: function executed before calculte puppeteer clip area

