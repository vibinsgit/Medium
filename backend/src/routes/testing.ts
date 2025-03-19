import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const testRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

testRouter.get("/host", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("Hello Test!");
});

testRouter.get("/db-connection", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.$connect(); // Try to connect to the DB

    return c.json({ status: "Database connection successful!" });
  } catch (error: any) {
    return c.json(
      { error: "Database connection failed!", details: error.message },
      500
    );
  }
});
