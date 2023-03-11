import { Schema, model, Document } from "mongoose";

export interface ITemperature extends Document {
  temperature: number;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  user: string;
  date: Date;
}

const temperatureSchema = new Schema({
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

export default model<ITemperature>("Temperature", temperatureSchema);
