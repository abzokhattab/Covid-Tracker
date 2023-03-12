"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const DatabaseConnection_1 = __importDefault(require("./services/DatabaseConnection"));
(0, DatabaseConnection_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)());
// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.send("hello");
});
app.use("/api", routes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
exports.default = app;
//# sourceMappingURL=app.js.map