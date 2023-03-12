"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtCheck = void 0;
require("dotenv").config();
const { auth } = require("express-oauth2-jwt-bearer");
const { AUTH0_DOMAIN } = process.env;
exports.jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${AUTH0_DOMAIN}/`,
    tokenSigningAlg: "RS256",
});
//# sourceMappingURL=auth.js.map