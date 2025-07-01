-- CreateTable
CREATE TABLE "Dokumen" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender" TEXT NOT NULL,

    CONSTRAINT "Dokumen_pkey" PRIMARY KEY ("id")
);
