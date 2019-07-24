import mysql2 from "mysql2/promise";

export const database = mysql2.createPool({
  host: "localhost",
  database: "shop_db",
  user: "serkan",
  password: "11037600"
});
