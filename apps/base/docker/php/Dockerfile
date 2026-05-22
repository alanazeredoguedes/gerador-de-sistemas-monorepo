FROM php:8.1.0-fpm

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

WORKDIR /var/www
