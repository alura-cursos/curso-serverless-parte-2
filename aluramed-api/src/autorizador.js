const usuarios = {
  'abc-123': 'user1'
}

module.exports.autorizar = function (event, context, callback) {
  const token = event.authorizationToken

  const usuario = usuarios[token]

  if (!usuario) {
    callback("Unauthorized")
  } else {
    const politicaAcesso = {
      principalId: usuario,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: 'arn:aws:execute-api:us-east-1:random-account-id:random-api-id/dev/GET/pacientes'
          },
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: 'arn:aws:execute-api:us-east-1:random-account-id:random-api-id/dev/DELETE/pacientes/{pacienteId}'
          }
        ]
      },
      context: {
        username: usuario,
        role: 'member'
      }
    }

    callback(null, politicaAcesso)
  }

}
