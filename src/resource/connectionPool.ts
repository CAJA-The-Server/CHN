import { createPool } from "mysql2/promise";
import databaseConfig from "../config/database.config.js";
import poolConfig from "../config/pool.config.js";

export const connectionPool = createPool({ ...databaseConfig, ...poolConfig });

export default connectionPool;