#!/bin/bash
set -e

# create role
psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "device_db" <<-EOSQL
-- Создание нового пользователя с паролем
CREATE USER app_user WITH PASSWORD 'app_password';

-- Предоставление прав на создание базы данных
ALTER USER app_user CREATEDB;

-- Назначение прав на чтение и запись для всех таблиц в схеме public
GRANT CONNECT ON DATABASE device_db TO app_user;

GRANT USAGE ON SCHEMA public TO app_user;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user;

GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO app_user;

-- Назначение прав на создание новых объектов
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO app_user;
EOSQL
