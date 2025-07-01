-- CreateTable
CREATE TABLE "Projek" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projek_pkey" PRIMARY KEY ("id")
);
