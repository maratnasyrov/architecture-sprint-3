-- Создание пользователя с паролем
CREATE USER postgres
WITH
  PASSWORD 'postgres';

-- Предоставление прав на создание базы данных
ALTER USER postgres CREATEDB;

-- Назначение прав на чтение и запись для всех таблиц в схеме public
GRANT CONNECT ON DATABASE device_db TO postgres;

GRANT USAGE ON SCHEMA public TO postgres;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- Назначение прав на создание новых объектов
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;