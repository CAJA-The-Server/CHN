import { TypeormStore } from "connect-typeorm";
import Express, { ErrorRequestHandler } from "express";
import session from "express-session";
import { env, NODE_ENV } from "./env";
import { dataSource } from "./models/dataSource";
import { Session } from "./models/Session";
import { api } from "./routers/apiRouter";
import { logger } from "./utils/logger";

export const express = Express();

express.use(
  session({
    secret: env.server.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 1000,
    },
    store: new TypeormStore().connect(dataSource.getRepository(Session)),
  })
);

express.use("/api", api);

const pageHandler = (() => {
  switch (NODE_ENV) {
    case "development":
      break;
    case "production":
      break;
  }
})();

express.use("*", (req, res) => {
  res.status(200).end();
});

express.use(((err, req, res, next) => {
  logger.error(err);
  res.status(500).end();
}) satisfies ErrorRequestHandler);