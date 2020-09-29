# node-mongo-rest-api

A node rest api server build with `polka, mongodb`

### Initial setup

1. Create .env file in root directory with following env variables

```
    PORT=
    CLUSTER_MODE= bool
    TZ=UTC or any timezone

    POSTGRES_URL=
    DB_NAME=
    DB_USER=
    DB_PASS=

    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=

    SALT=
```

### Notes

by default `g-zip compression` is enabled, to disable compression do following on each request

```header
header["x-no-compression"] = true
```

### Docs

- [polka](https://github.com/lukeed/polka)
- [polka-send-type](https://www.npmjs.com/package/@polka/send-type)
- [cors-origin](https://github.com/expressjs/cors#readme)
- [node-postgres](https://node-postgres.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [pino-logger](https://github.com/pinojs/pino)
- [http-errors](https://github.com/jshttp/http-errors)
- [donenv](https://github.com/motdotla/dotenv)
- [compression](https://github.com/expressjs/compression)
- [file-upload](https://nodejspedia.com/en/tutorial/4080/file-upload)

### Courtesy

- [Source](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)

- [article](https://www.taniarascia.com/node-express-postgresql-heroku/#production-tips)
