import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Form, Container, ListGroup, Alert } from "react-bootstrap";

// Query to get vital signs
const GET_VITAL_SIGNS_QUERY = gql`
  query GetVitalSigns {
    vitalSigns {
      id
      heartRate
      bloodPressure
      temperature
      respiratoryRate
    }
  }
`;

// Mutation to add vital signs
const ADD_VITAL_SIGNS_MUTATION = gql`
  mutation AddVitalSigns(
    $heartRate: Int!
    $bloodPressure: String!
    $temperature: Float!
    $respiratoryRate: Int!
  ) {
    addVitalSigns(
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      temperature: $temperature
      respiratoryRate: $respiratoryRate
    ) {
      id
      heartRate
      bloodPressure
      temperature
      respiratoryRate
    }
  }
`;

function VitalSignsComponent() {
  const { loading, error, data } = useQuery(GET_VITAL_SIGNS_QUERY, {
    context: { credentials: "include" },
  });

  const [addVitalSigns, { loading: adding }] = useMutation(
    ADD_VITAL_SIGNS_MUTATION,
    {
      refetchQueries: [GET_VITAL_SIGNS_QUERY],
    }
  );

  const [heartRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [temperature, setTemperature] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !heartRate.trim() ||
      !bloodPressure.trim() ||
      !temperature.trim() ||
      !respiratoryRate.trim()
    )
      return;
    await addVitalSigns({
      variables: {
        heartRate: parseInt(heartRate),
        bloodPressure,
        temperature: parseFloat(temperature),
        respiratoryRate: parseInt(respiratoryRate),
      },
    });
    setHeartRate("");
    setBloodPressure("");
    setTemperature("");
    setRespiratoryRate("");
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Alert variant='danger'>
        Error :( Please make sure you're logged in.
      </Alert>
    );

  return (
    <Container>
      <h2>Add Vital Signs</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Heart Rate</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter heart rate'
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Blood Pressure</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter blood pressure (e.g., 120/80)'
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Temperature</Form.Label>
          <Form.Control
            type='number'
            step='0.1'
            placeholder='Enter temperature (e.g., 36.5)'
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Respiratory Rate</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter respiratory rate'
            value={respiratoryRate}
            onChange={(e) => setRespiratoryRate(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit' disabled={adding}>
          Add Vital Signs
        </Button>
      </Form>

      <h3 className='mt-4'>Vital Signs List</h3>
      <ListGroup>
        {data &&
          data.vitalSigns.map(
            ({
              id,
              heartRate,
              bloodPressure,
              temperature,
              respiratoryRate,
            }) => (
              <ListGroup.Item key={id}>
                <strong>Heart Rate:</strong> {heartRate} bpm
                <br />
                <strong>Blood Pressure:</strong> {bloodPressure}
                <br />
                <strong>Temperature:</strong> {temperature}°C
                <br />
                <strong>Respiratory Rate:</strong> {respiratoryRate} breaths/min
              </ListGroup.Item>
            )
          )}
      </ListGroup>
    </Container>
  );
}

export default VitalSignsComponent;
