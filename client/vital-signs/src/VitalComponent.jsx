import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Form, Container, ListGroup, Alert } from "react-bootstrap";
import { add } from "three/webgpu";

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
  // const { loading, error, data } = useQuery(GET_VITAL_SIGNS_QUERY, {
  //   context: { credentials: "include" },
  // });

  const [edit, setEdit] = useState(null);
  const [addVital, setAddVital] = useState(false);

  const [data, setData] = useState({
    vitalSigns: [
      {
        id: 1,
        heartRate: 80,
        bloodPressure: "120/80",
        temperature: 21.6,
        respiratoryRate: 16,
      },
      {
        id: 2,
        heartRate: 85,
        bloodPressure: "124/80",
        temperature: 21.7,
        respiratoryRate: 20,
      },
    ],
  });

  const [addVitalSigns, { loading: adding }] = useMutation(
    ADD_VITAL_SIGNS_MUTATION,
    {
      refetchQueries: [GET_VITAL_SIGNS_QUERY],
    }
  );

  const [id, setId] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [temperature, setTemperature] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");

  async function configEdit(
    id,
    heartRate,
    bloodPressure,
    temperature,
    respiratoryRate
  ) {
    setId(id);
    setHeartRate(heartRate);
    setBloodPressure(bloodPressure);
    setTemperature(temperature);
    setRespiratoryRate(respiratoryRate);

    setEdit(id);
  }

  async function handleEdit() {
    let isValid = inputValidation();

    if (!isValid) {
      return;
    }

    // PUT to GraphQL server
    await addVitalSigns({
      variables: {
        id,
        heartRate: parseInt(heartRate),
        bloodPressure,
        temperature: parseFloat(temperature),
        respiratoryRate: parseInt(respiratoryRate),
      },
    });

    resetInput();
  }

  async function handleAdd() {
    let isValid = inputValidation();

    if (!isValid) {
      return;
    }

    // POST to GraphQL server
    await addVitalSigns({
      variables: {
        heartRate: parseInt(heartRate),
        bloodPressure,
        temperature: parseFloat(temperature),
        respiratoryRate: parseInt(respiratoryRate),
      },
    });

    resetInput();
  }

  function inputValidation() {
    if (
      !heartRate.trim() ||
      !bloodPressure.trim() ||
      !temperature.trim() ||
      !respiratoryRate.trim()
    ) {
      return false;
    }
    return true;
  }

  function resetInput() {
    setId("");
    setHeartRate("");
    setBloodPressure("");
    setTemperature("");
    setRespiratoryRate("");
  }

  // if (loading) return <p>Loading...</p>;
  // if (error)
  //   return (
  //     <Alert variant='danger'>
  //       Error :( Please make sure you're logged in.
  //     </Alert>
  //   );

  return (
    <Container>
      <div className='vital-signs-list'>
        <h2>Vital Signs List</h2>
        <Button variant='primary' onClick={() => setAddVital(true)}>
          Add Vital
        </Button>
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
                  <strong>Respiratory Rate:</strong> {respiratoryRate}{" "}
                  breaths/min
                  <br />
                  <Button
                    variant='primary'
                    onClick={() =>
                      configEdit(
                        id,
                        heartRate,
                        bloodPressure,
                        temperature,
                        respiratoryRate
                      )
                    }
                  >
                    Edit
                  </Button>
                </ListGroup.Item>
              )
            )}
        </ListGroup>
      </div>

      {addVital && (
        <div className='popup'>
          <h2>Add Vital Signs</h2>
          <Form>
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
            <Button
              variant='primary'
              type='submit'
              disabled={adding}
              onClick={handleAdd}
            >
              Add Vital Signs
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                resetInput();
                setAddVital(false);
              }}
            >
              {" "}
              Cancel{" "}
            </Button>
          </Form>
        </div>
      )}

      {edit && (
        <div className='popup'>
          <h1>Edit Vital Sign</h1>

          <Form>
            <Form.Control type='text' value={edit} hidden />

            {/* FORM EDIT FIELD */}
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
            <Button
              variant='primary'
              type='submit'
              disabled={adding}
              onClick={() => handleEdit()}
            >
              Edit Vital Signs
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                resetInput();
                setEdit(null);
              }}
            >
              {" "}
              Cancel{" "}
            </Button>
          </Form>
        </div>
      )}
    </Container>
  );
}

export default VitalSignsComponent;
