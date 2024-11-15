import { gql } from "apollo-server-express";

const typeDefs = gql`
  type VitalSign {
    id: ID
    temperature: Float
    bloodPressure: String
    heartRate: Float
    respiratoryRate: Float
  }

  type Query {
    vitalSigns: [VitalSign]
    vitalSign(id: ID!): VitalSign
  }

  type Mutation {
    createVitalSign(
      temperature: Float!
      bloodPressure: String!
      heartRate: Float!
      respiratoryRate: Float!
    ): VitalSign
    updateVitalSign(
      id: ID!
      temperature: Float!
      bloodPressure: String!
      heartRate: Float!
      respiratoryRate: Float!
    ): VitalSign
    deleteVitalSign(id: ID!): VitalSign
  }
`;

export default typeDefs;
