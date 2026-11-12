# Nexora

SaaS ERP trên Next.js, PostgreSQL, React và Tailwind. Nghiệp vụ tổ chức theo DDD. Kiến trúc và cây thư mục nằm ở [ARCHITECTURE.md](./ARCHITECTURE.md).

## Chạy giao diện

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Postgres cục bộ

```bash
cp deploy/.env.example deploy/.env
docker compose -f deploy/docker-compose.yml up -d
```

File `deploy/.env` chỉ dùng cho máy dev. Migration đầu tiên là `db/migrations/0001_platform.sql`, được nạp khi volume Postgres còn trống.
