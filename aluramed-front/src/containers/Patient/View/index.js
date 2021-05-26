import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { onError } from "../../../libs/errorLib";
import { formatDate } from "../../../libs/utils";
import { getPatient } from "../../../services/patients";
import "./style.css";

export default function Notes() {
  const { id } = useParams();
  const history = useHistory();
  const [patient, setPatient] = useState(null);
  const [isLoadedPatient, setIsLoadedPatient] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        const loadedPatient = await getPatient(id);

        setPatient(loadedPatient);
        setIsLoadedPatient(true);
      } catch (e) {
        onError(e);

        setIsLoadedPatient(false);
      }
    }

    onLoad();
  }, [id]);

  return (
    <div className="Patients">
      {isLoadedPatient ? (
        <Form>
          <h3>Dados do Paciente</h3>
          <br />
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm="2">
              Nome
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={patient.nome} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="birthdate">
            <Form.Label column sm="2">
              Data de Nascimento
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue={formatDate(patient.data_nascimento)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="phone">
            <Form.Label column sm="2">
              Telefone
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue={patient.telefone}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm="2">
              E-mail
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={patient.email} />
            </Col>
          </Form.Group>
        </Form>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
