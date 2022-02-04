import "dotenv/config";
import "./strategies/discord";

import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import routes from "./routes";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(
    process.env.MONGO_URL ||
      "mongodb+srv://Pervica:Pervica@cluster0.jtimk.mongodb.net/AsakaV3"
  )
  .then(() => {
    console.log("Connected to server");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Connection established");
});

export { io };

httpServer.listen(PORT, () => console.log(`Running on Port ${PORT}`));
// app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
