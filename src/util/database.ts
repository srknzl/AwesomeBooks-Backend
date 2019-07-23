import mysql2 from "mysql2";

const pool = mysql2.createPool({
  host: "localhost",
  database: "shop_db",
  user: "serkan",
  password: "11037600"
});

export const database = pool.promise();