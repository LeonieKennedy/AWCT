FROM python:latest
WORKDIR /app

RUN apt update
RUN apt-get update
RUN apt install npm -y

COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "start", "--host", "0.0.0.0", "--port", "3000"]