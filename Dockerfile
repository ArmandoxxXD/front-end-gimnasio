# Usa la imagen base de Node.js 18.19.1
FROM node:18.19.1 AS build

# Establece el directorio de trabajo en /app dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias necesarias para construir la aplicación Angular
RUN npm install

# Copia el código fuente completo al directorio de trabajo en el contenedor
COPY . .

# Compila la aplicación Angular
RUN npm run build

# Cambia a la imagen de NGINX para servir los archivos estáticos de Angular
FROM nginx:alpine

# Borra cualquier contenido existente en la carpeta de NGINX donde se servirán los archivos
RUN rm -rf /usr/share/nginx/html/*

# Copia el archivo de configuración de NGINX personalizado al contenedor
COPY nginx.conf /etc/nginx/nginx.conf

# Copia el archivo mime.types para especificar los tipos MIME de los archivos servidos
COPY mime.types /etc/nginx/mime.types

# Copia los archivos de la aplicación Angular construidos en la carpeta /dist/client desde la etapa de construcción al directorio HTML de NGINX
COPY --from=build /app/dist/client /usr/share/nginx/html

# Expone el puerto 80, que NGINX usará para servir la aplicación
EXPOSE 80

# Comando para iniciar NGINX en modo de primer plano
CMD ["nginx", "-g", "daemon off;"]
