import mysql from "mysql";

const dbConn = mysql.createConnection({
  host: "www.gaiasoaps.in",
  user: "root",
  password: "m@nish098",
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
