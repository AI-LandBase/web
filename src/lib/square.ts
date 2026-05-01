import { SquareClient, SquareEnvironment } from "square";

export const squareClient =
  process.env.SQUARE_ACCESS_TOKEN
    ? new SquareClient({
        token: process.env.SQUARE_ACCESS_TOKEN,
        environment:
          process.env.SQUARE_ENVIRONMENT === "production"
            ? SquareEnvironment.Production
            : SquareEnvironment.Sandbox,
      })
    : null;

export const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
