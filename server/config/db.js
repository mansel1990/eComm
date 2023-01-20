import mysql from "mysql";
import dontenv from "dotenv";

dontenv.config();

/* const dbConn1 = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
}); */

const env = process.env.NODE_ENV;

const dbConnProd = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 10000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

let dbConn = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 10000,
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PWD,
  database: process.env.LOCAL_DB_NAME,
  multipleStatements: true,
});

if (env === "prod") {
  dbConn = dbConnProd;
}

//Sample
/* try {
  dbConn.connect((err) => {
    if (err) {
      console.log(`Error - , ${err.message}`.red.bold);
    } else {
      console.log(`Database Connected!`.underline.cyan);
    }
  });
} catch (error) {
  console.log(`Error - , ${error.message}`.red.bold);
} */

export default dbConn;
