-- CreateTable
CREATE TABLE "MataPelajaran" (
    "id" SERIAL NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "sks" INTEGER NOT NULL DEFAULT 2,
    "semester" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MataPelajaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MataPelajaran_kode_key" ON "MataPelajaran"("kode");
