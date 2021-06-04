import { Schema } from "mongoose";

export const CustomerSchema = new Schema({
    number: String,
    name: String,
    address: String,
    phone: String,
    createdAt: { type: Date, default: Date.now }
});
