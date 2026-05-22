-- Cria os bancos usados pelo monorepo GDS.
-- O DB principal (gds_back) também é criado via env MYSQL_DATABASE no compose;
-- mantemos aqui pra deixar idempotente e documentado.

CREATE DATABASE IF NOT EXISTS gds_back
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- DB reservado caso o template base venha a rodar standalone (Q2=b: opcional).
CREATE DATABASE IF NOT EXISTS gds_base_dev
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON gds_back.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON gds_base_dev.* TO 'root'@'%';
FLUSH PRIVILEGES;
