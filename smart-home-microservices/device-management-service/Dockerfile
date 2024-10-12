FROM node:20-alpine AS development

RUN npm install -g pnpm @nestjs/cli

WORKDIR /app

COPY package*.json ./

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:20-alpine as production

RUN npm install -g pnpm @nestjs/cli

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=development /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]