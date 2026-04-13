# ===== ЭТАП 1: Сборка приложения =====
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# ✅ Устанавливаем ВСЕ зависимости (включая dev)
RUN npm ci

# Копируем исходный код
COPY . .

# ✅ Собираем приложение
RUN npm run build

# ===== ЭТАП 2: Сервис для раздачи статики =====
FROM nginx:alpine

# Копируем собранные файлы из builder
COPY --from=builder /app/dist /usr/share/nginx/html

# (Опционально) Копируем конфигурацию nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]