import http from "http";
import { info } from "./utils/logger.js";
import { PORT } from "./utils/config.js";

import app from "./app.js";
const server = http.createServer(app);

server.listen(PORT | 3001, () => {
  info(`server running on port ${PORT}`);
});
