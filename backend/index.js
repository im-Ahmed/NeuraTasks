import { server } from "./app.js";
import dotenvx from "@dotenvx/dotenvx";
import { ConnectDB } from "./src/db/index.js";
dotenvx.config();
ConnectDB()
  .then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
