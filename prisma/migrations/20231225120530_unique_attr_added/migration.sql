/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_id_user_id_key" ON "Product"("id", "user_id");
