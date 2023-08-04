-- CreateTable
CREATE TABLE "tasks_users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tasksId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "tasks_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
