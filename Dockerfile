# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости с безопасными правами
RUN npm install --unsafe-perm --allow-root

# Копируем остальные файлы проекта
COPY . .

# Генерируем Prisma Client (если используется Prisma)
RUN npx prisma generate

# Открываем порты (если приложение слушает на порту 3001)
EXPOSE 3001

# Запускаем контейнер с ожиданием базы данных и запуском приложения
CMD ["sh", "-c", "npm run start:dev"]