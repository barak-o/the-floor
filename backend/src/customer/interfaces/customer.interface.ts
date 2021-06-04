import { Document } from "mongoose";

export interface Customer extends Document {
    readonly number: string;
    readonly name: string;
    readonly address: string;
    readonly phone: string;
}
