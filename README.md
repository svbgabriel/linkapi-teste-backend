# linkapi-teste-backend

Testado com o node versão v12.16.1

## Para subir o serviço:

- Copiar o arquivo .env.example com o nome .env
- Preencher os atributos:
  - PORT: Número da porta a ser utilizado (padrão 3333)
  - DB_URL: URL de conexão com o MongoDB
  - PIPEDRIVE_TOKEN: Token de API do Pipedrive
  - PIPEDRIVE_COMPANY: Nome da companhia do Pipedrive
  - BLING_TOKEN: Token de API do Bling

* Executar o comando:

  `npm run-script dev`

## Execução:

### Sincronização do Pipedrive e Bling

    POST localhost:PORT/integration

### Agregação dos valores

    GET localhost:PORT/integration
