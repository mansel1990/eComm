import mysql from "mysql";
import dontenv from "dotenv";

dontenv.config();

const dbConn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: process.env.DB_PWD,
});

try {
  dbConn.connect((err) => {
    if (err) {
      console.log(`Error - , ${err.message}`.red.bold);
    } else {
      console.log(`Database Connected!`.underline.cyan);
    }
  });
} catch (error) {
  console.log(`Error - , ${error.message}`.red.bold);
}

export default dbConn;
