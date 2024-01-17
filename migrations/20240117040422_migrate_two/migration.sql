-- CreateTable
CREATE TABLE "Wine" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "varietal" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "consumed" BOOLEAN,
    "dateConsumed" TIMESTAMP(3),

    CONSTRAINT "Wine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wine_id_key" ON "Wine"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
