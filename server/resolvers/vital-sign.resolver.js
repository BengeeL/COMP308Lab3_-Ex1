import VitalSign from "../models/vital-sign.model.js";

const resolvers = {
  Query: {
    vitalSigns: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSigns = await VitalSign.find({});
        console.log(vitalSigns);
        return vitalSigns;
      } catch (error) {
        console.error("Error in vitalSigns resolver: ", error);
        return [];
      }
    },
    vitalSign: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { id } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.findById(id);
        return vitalSign;
      } catch (error) {
        console.error("Error in vitalSign resolver: ", error);
        return null;
      }
    },
  },

  Mutation: {
    createVitalSign: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { temperature, bloodPressure, heartRate, respiratoryRate } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.create({
          temperature,
          bloodPressure,
          heartRate,
          respiratoryRate,
        });

        return vitalSign;
      } catch (error) {
        console.error("Error in createVitalSign resolver: ", error);
        return null;
      }
    },

    updateVitalSign: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { id, temperature, bloodPressure, heartRate, respiratoryRate } =
        args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.findByIdAndUpdate(
          id,
          { temperature, bloodPressure, heartRate, respiratoryRate },
          { new: true }
        );

        return vitalSign;
      } catch (error) {
        console.error("Error in updateVitalSign resolver: ", error);
        return null;
      }
    },

    deleteVitalSign: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { id } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.findByIdAndDelete(id);
        return vitalSign;
      } catch (error) {
        console.error("Error in deleteVitalSign resolver: ", error);
        return null;
      }
    },
  },
};

export default resolvers;
