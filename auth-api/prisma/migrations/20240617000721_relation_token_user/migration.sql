-- CreateTable
CREATE TABLE "Token" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "ResetToken" VARCHAR(250) NOT NULL,
    "ResetTokenExpiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE INDEX "Token_UserId_idx" ON "Token"("UserId");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
