
```sh
npm install
npm start

```

## Deploy
```sh
npm run deploy
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

## Settings for Libaray
`src/service/constant.js#Service`

`url`: remote block json

`selector`: `Object` CSS selector when iterator data `attribute`

`name`: saved filename after download block json

`waitUntil`: puppeteer `waitUntil` option

`viewport`: puppeteer `viewport` option

`runBeforeWaitForSelector`: `function` run in puppeteer browser before element visible. For example, switch languages.

`runInBrowser`: function executed before calculte puppeteer clip area

