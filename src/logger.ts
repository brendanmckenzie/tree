import * as winston from "winston";
import * as expressWinston from "express-winston";

export const logger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.cli(),
  colorize: false,
});
