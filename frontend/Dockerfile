


FROM python:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y npm

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

# Expose port 3000
EXPOSE 3000

ENTRYPOINT ["npm", "start", "--host", "0.0.0.0", "--port", "3000"]
