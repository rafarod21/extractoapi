# ---------- ESTÁGIO DE BUILD ----------
FROM node:20-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Instala pacotes necessários para compilar bcrypt / prisma native bindings
RUN apk add --no-cache python3 make g++ openssl

# Copia package.json e package-lock.json (se existir)
COPY package*.json ./

# Copia pasta prisma para que prisma generate funcione durante o build
COPY prisma ./prisma/

# Remove script prepare (husky) se existir para evitar problemas no CI/Build
RUN npm pkg delete scripts.prepare || true

# Instala dependências (incluindo devDeps) para permitir build TypeScript
RUN npm ci

# Gera Prisma Client
RUN npx prisma generate

# Copia todo o código fonte
COPY . .

# Compila TypeScript para JavaScript (verifique se você tem "build" no package.json)
RUN npm run build

# ---------- ESTÁGIO DE PRODUÇÃO ----------
FROM node:20-alpine AS production

WORKDIR /app

ENV PORT=3000

# Dependências necessárias em runtime para reconstruir binários se necessário
RUN apk add --no-cache python3 make g++ openssl curl

# Copia package.json e package-lock.json para instalar apenas deps de produção
COPY package*.json ./

# Remove script prepare (husky) caso exista
RUN npm pkg delete scripts.prepare || true

# Instala apenas dependências de produção
RUN npm ci --omit=dev

# Copia artefatos gerados pelo builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expõe porta da aplicação
EXPOSE 3000

# Comando default: aplica migrations (deploy) e inicia a aplicação.
# Observação: o comando real de start é chamado pelo docker-compose (veja lá),
# mas manteremos um CMD seguro caso rode o container diretamente.
CMD ["node", "dist/server.js"]
