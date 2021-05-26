import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../../../components/LoaderButton";
import { onError } from "../../../libs/errorLib";
import { useFormFields } from "../../../libs/hooksLib";
import { createPatient } from "../../../services/patients";
import "./style.css";

export default function New() {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    phone: "",
    birthday: "",
    email: "",
  });

  async function handleSubmit(event) {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity()) {
      setIsLoading(true);

      try {
        await createPatient({
          nome: fields.name,
          telefone: fields.phone,
          data_nascimento: fields.birthday,
          email: fields.email,
        });
        history.push("/patients");
      } catch (e) {
        onError(e);
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="New Patient">

      <h3>Novo Paciente</h3>
      <br />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            Nome é obrigatório.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group size="lg" controlId="phone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            required
            type="tel"
            value={fields.phone}
            pattern="[0-9]{2} [0-9]{4,5}[0-9]{4}"
            placeholder="99 999999999"
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            Telefone é obrigatório.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group size="lg" controlId="birthday">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            required
            type="date"
            value={fields.birthday}
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            Data de nascimento é obrigatório.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            required
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            E-mail é obrigatório.
          </Form.Control.Feedback>
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
        >
          Cadastrar
        </LoaderButton>
      </Form>
    </div>
  );
}
