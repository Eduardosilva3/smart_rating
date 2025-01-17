
# Apresentação

## Passos para Iniciar o Projeto

### 1. Iniciar o Redis com Docker
Execute o comando abaixo para iniciar o Redis com persistência habilitada:
```bash
docker run --name redis-mvp -p 6379:6379 -d \
  -v redis-data:/data \
  redis redis-server --save 60 1 --appendonly yes
```

---

### 2. Backend

1. Entre na pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o backend:
   ```bash
   npm run dev
   ```

---

### 3. smart-rating-angular

1. Entre na pasta do frontend:
   ```bash
   cd smart-rating-angular
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o frontend:
   ```bash
   ng s
   ```

---

## Informações Adicionais

- **Backend**: O servidor estará disponível em `http://localhost:5000`.
- **Frontend**: A aplicação estará disponível em `http://localhost:4200`.

Agora você pode controlar a votação em tempo real e visualizar os resultados! 🚀
