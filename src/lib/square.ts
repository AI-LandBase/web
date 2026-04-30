import { Client, Environment } from "square";

export const squareClient =
  process.env.SQUARE_ACCESS_TOKEN
    ? new Client({
        token: process.env.SQUARE_ACCESS_TOKEN,
        environment:
          process.env.SQUARE_ENVIRONMENT === "production"
            ? Environment.Production
            : Environment.Sandbox,
      })
    : null;

export const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
