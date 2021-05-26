import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../../components/LoaderButton";
import { onError } from "../../../libs/errorLib";
import {
  getPatient,
  savePatient,
  deletePatient,
} from "../../../services/patients";

export default function Notes() {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        const loadedPatient = await getPatient(id);

        setName(loadedPatient.nome);
        setBirthday(loadedPatient.data_nascimento);
        setPhone(loadedPatient.telefone);
        setEmail(loadedPatient.email);

        setDataLoaded(true);
      } catch (e) {
        console.log(e);
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  async function handleSubmit(event) {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity()) {
      setIsLoading(true);

      try {
        await savePatient(id, {
          nome: name,
          telefone: phone,
          data_nascimento: birthday,
          email,
        });
        history.push("/patients");
      } catch (e) {
        onError(e);
        setIsLoading(false);
      }
    }
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm("Você deseja remover este registro?");

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deletePatient(id);
      history.push("/patients");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Patients">
      {isDataLoaded ? (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h3>Editar Paciente</h3>
          <br />
          <Form.Group size="lg" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              autoFocus
              required
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Nome é obrigatório.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group size="lg" controlId="phone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="tel"
              required
              value={phone}
              pattern="[0-9]{2} [0-9]{4,5}[0-9]{4}"
              placeholder="99 999999999"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Telefone é obrigatório.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group size="lg" controlId="birthday">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              required
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Data de nascimento é obrigatório.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              required
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
            Salvar
          </LoaderButton>

          <LoaderButton
            block
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Excluir
          </LoaderButton>
        </Form>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
