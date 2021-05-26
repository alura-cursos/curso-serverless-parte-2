import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Auth } from "aws-amplify";
import LoaderButton from "../../components/LoaderButton";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./style.css";

export default function ChangePassword() {
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        password: "",
        oldPassword: "",
        confirmPassword: "",
    });
    const [isChanging, setIsChanging] = useState(false);

    function validateForm() {
        return (
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    async function handleChangeClick(event) {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        if (form.checkValidity()) {
            try {
                const currentUser = await Auth.currentAuthenticatedUser();
                await Auth.changePassword(
                    currentUser,
                    fields.oldPassword,
                    fields.password
                );

                history.push("/");
            } catch (error) {
                onError(error);
                setIsChanging(false);
            }
        }
    }

    return (
        <div className="ChangePassword">
            <Form noValidate validated={validated} onSubmit={handleChangeClick}>
                <Form.Group size="large" controlId="oldPassword">
                    <Form.Label>Senha Atual</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        minLength={8}
                        onChange={handleFieldChange}
                        value={fields.oldPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        Senha Atual é obrigatório.
                    </Form.Control.Feedback>
                </Form.Group>
                <hr />
                <Form.Group size="large" controlId="password">
                    <Form.Label>Nova Senha</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        minLength={8}
                        onChange={handleFieldChange}
                        value={fields.password}
                    />
                    <Form.Text className="text-muted">
                        A senha deve ser de no mínimo 8 caracterer e conter letras, números e caracteres especiais.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Nova Senha é obrigatório.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group size="large" controlId="confirmPassword">
                    <Form.Label>Confirmar Senha</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                        minLength={8}
                    />

                    <Form.Control.Feedback type="invalid">
                        Confirmar Senha é obrigatório.
                    </Form.Control.Feedback>
                </Form.Group>
                <LoaderButton
                    block
                    type="submit"
                    size="large"
                    disabled={!validateForm()}
                    isLoading={isChanging}
                >
                    Alterar Senha
                </LoaderButton>
            </Form>
        </div>
    );
}