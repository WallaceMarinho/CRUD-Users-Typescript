-- CreateTable
CREATE TABLE "usuarios" (
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "tipo" CHAR(1) NOT NULL,
    "status" CHAR(1) NOT NULL,
    "quant_acesso" INTEGER DEFAULT 0,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "criadoPor" VARCHAR(30) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);
