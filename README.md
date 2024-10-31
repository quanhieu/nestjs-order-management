## Development start

- Run application

```
docker compose up -d
```

- Or run `yarn dev`

## Production start

To get the `base64-encoded-username-and-password`, run the following command (replace `myusername:mypassword` with your registry credentials):

```
echo -n 'myusername:mypassword' | base64
```

- Update Base64 `auth` to [registry-credentials.json](./registry-credentials.json)

- Start docker compose

```
docker compose -f docker-compose.prod.yml up -d
```

## Document API

[Swagger](http://localhost:8000/api)
