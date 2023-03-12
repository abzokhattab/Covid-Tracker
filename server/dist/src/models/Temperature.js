"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const temperatureSchema = new mongoose_1.Schema({
    temperature: { type: Number, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    date: { type: Date, required: true },
    user: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
});
temperatureSchema.index({ location: "2dsphere" });
exports.default = (0, mongoose_1.model)("Temperature", temperatureSchema);
//# sourceMappingURL=Temperature.js.map