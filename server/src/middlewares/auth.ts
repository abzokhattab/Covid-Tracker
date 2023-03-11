require("dotenv").config();

const { auth } = require("express-oauth2-jwt-bearer");

const { AUTH0_DOMAIN } = process.env;
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});
