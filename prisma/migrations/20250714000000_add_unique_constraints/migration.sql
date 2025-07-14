-- Add unique constraints to name fields
ALTER TABLE "Plataforma" ADD CONSTRAINT "Plataforma_name_key" UNIQUE ("name");
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_name_key" UNIQUE ("name"); 