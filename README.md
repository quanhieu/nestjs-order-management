## Development start

```
docker compose up -d
```

## Production start

To get the `base64-encoded-username-and-password`, run the following command (replace `myusername:mypassword` with your registry credentials):

```
echo -n 'myusername:mypassword' | base64
```

### Start docker compose

```
docker compose -f docker-compose.prod.yml up -d
```
