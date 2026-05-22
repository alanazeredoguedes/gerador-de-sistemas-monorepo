FROM php:8.1.0-fpm

# System dependencies (superset of back/code-gen/base)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zlib1g-dev \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libmagickwand-dev \
    zip \
    unzip \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN mv /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini \
    && sed -ri \
        -e 's!;date.timezone =!date.timezone = "America/Sao_Paulo"!g' \
        -e 's!^memory_limit = .*!memory_limit = 512M!' \
        /usr/local/etc/php/php.ini

# Alinha o UID/GID do www-data com o usuário do host para que o PHP-FPM
# possa escrever em volumes bind-mounted sem problemas de permissão.
ARG HOST_UID=1000
ARG HOST_GID=1000
RUN if [ "$HOST_GID" != "$(id -g www-data)" ]; then groupmod -g "$HOST_GID" www-data; fi \
 && if [ "$HOST_UID" != "$(id -u www-data)" ]; then usermod -u "$HOST_UID" www-data; fi

WORKDIR /var/www
