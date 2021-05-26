export function onError(error) {
  let message = error.toString();
  const errors = {
    "UserNotFoundException": "Usuário não encontrado.",
    "UserNotConfirmedException": "Cadastro ainda não foi confirmado.",
    "PasswordResetRequiredException": "Usuários ou senhas inválidos.",
    "NotAuthorizedException": "Usuários ou senhas inválidos.",
    "InvalidPasswordException": "A senha é fraca, tente incluir letras maiúsculas e minúsculas, números e caracteres especiais.",
    "LimitExceededException": "Muitas tentativas de alterar a senha. Aguarde um tempo e tente novamente."
  }


  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;

    if (errors[error.code]) {
      message = errors[error.code]
    }
  }

  alert(message);
}
