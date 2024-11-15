import { model, Schema } from "mongoose";

const vitalSignSchema = new Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
    heartRate: {
      type: Number,
      required: true,
    },
    respiratoryRate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "vitalSigns",
  }
);

const VitalSign = model("VitalSign", vitalSignSchema);

export default VitalSign;
