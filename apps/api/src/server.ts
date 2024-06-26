// import express from "express";

// import logger from "morgan";
// import cors from "cors";
// import path from "path";
import socketInit from "./socket/socket";
import { initRabbitmq, rabbitmqConn } from "./rabbitmq/rabbitmq";

// const app = express();

socketInit();
initRabbitmq();

// app.use(cors());
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

// app.listen(process.env.PORT_SERVER || 4000);
// console.log(
//   `server started at http://localhost:${process.env.PORT_SERVER || 4000}`,
// );

// check before exit
process.on("exit", (code) => {
  rabbitmqConn.close();
  console.log(`About to exit with code: ${code}`);
});
