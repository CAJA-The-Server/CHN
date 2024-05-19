import { join } from "path";
import configPath from "./config.path.js";
import joi from "joi";
import { ConnectionOptions } from "mysql2";

export const path = join(configPath, "database.json");

export const schema = joi.object({
  user: joi.string().required(),
  password: joi.string().required(),
  database: joi.string().required(),
  host: joi.string().required(),
});

export type DatabaseConfig = Readonly<
  ConnectionOptions & {
    readonly user: string;
    readonly password: string;
    readonly database: string;
    readonly host: string;
  }
>;

export default DatabaseConfig;
