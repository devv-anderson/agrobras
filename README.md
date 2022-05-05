<h1 align="center">AgroBras - Cultivando o que temos de melhor <br /></h1>  

![agrobrasIcon](https://user-images.githubusercontent.com/63078411/163828683-f1f70351-de27-4c67-bc67-457e98b3ad49.jpg)

## Aplicação web construida com Reactjs + Expressjs + Nodejs + MongoDB (MERN)💻

## Recursos

- Perfil de vendedor
- Add/deletar produtos
- Editar perfil
- Perfil de agricultor
- Add/deletar sementes
- Editar perfil
- Add/editar endereço
- Comprar sementes/pesticidas ou maquinas de colheitas
- Integração paypal
- Consumidor
- Editar perfil
- Add/editar endereço
- Comprar colheitas de agricultores
- Carrinho pagina
- Alterar Quantidade
- Remover product do carrinho
- Integração Goole maps

### Env Variavel

Crie um arquivo .env na raiz do projeto e adicone as seguintes variaveis

```
NODE_ENV = desenvolvimento
PORT = 5000
MONGO_URI = sua mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = sua chave paypal
```

Crie um arquivo .env dentro da pasta frontend e adicione a seguinte variavel

```
REACT_APP_GOOGLE_KEY = "sua chave google map api"
```

### Instale as dependencias (frontend & backend)

```
npm install
cd frontend
npm install
```

### Executar

```
# Executar frontend (:3000) & backend (:5000)
npm run dev

# Executar apenas backend
npm run server
```

### Produtos e usuarios de exemplo

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
