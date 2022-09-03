# установить ноду
FROM node

# создать папку
WORKDIR /app

# скачать файлы
COPY . .

# поставить нод-модули
RUN npm install

# номер порта
EXPOSE 3000

# команда запуска
CMD ["node", "server"]