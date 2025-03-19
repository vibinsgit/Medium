import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { hashPassword } from "./hashPass";
import { signinInput, signupInput } from "@vibins/common";
import { Context, Next } from "hono";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.use("/*", async (c: Context, next: Next) => {
  const header = c.req.header("Authorization");

  if (!header || !header.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ error: "Missing or Invalid token" });
  }

  const token = header.split(" ")[1];

  try {
    const verification = await verify(token, c.env.JWT_SECRET);

    if (verification && verification.id) {
      c.set("userId", verification.id); // Set userId in request context
      return await next();
    } else {
      c.status(403);
      return c.json({ error: "You are not logged in." });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "Invalid or expired token." });
  }
});


//User Signup:
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Zod validation error with signup route",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (existingUser) {
    c.status(403);
    return c.json({ error: "User already exists" });
  }

  const hashedKey = await hashPassword(body.password);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      username: body.username,
      password: hashedKey,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ token });
});

//User Signin :
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Zod Validation error with sigin route",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({
      error: "User not found! Please Signup",
    });
  }

  const hashedInputPassword = await hashPassword(body.password);

  if (hashedInputPassword !== user.password) {
    c.status(403);
    return c.json({ error: "Incorrect Password." });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ token });
});

userRouter.get("/me", async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  console.log("Fetching user for ID:", userId);

  const user = await prisma.user.findUnique({
    where: {id: userId},
    select: {
      id: true,
      name: true,
      username: true,
    },
  });

  console.log("Fetched User Data:", user);

  if(!user) {
    c.status(404);
    return c.json({error: "User not found!" });
  }

  return c.json({
    user
  });
});