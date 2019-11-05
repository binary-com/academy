FROM nginx:alpine
COPY ./_site /usr/share/nginx/html
COPY ./academy.com.conf /etc/nginx/conf.d/default.conf
