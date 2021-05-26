"use strict";

const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamodbOfflineOptions = {
  region: "localhost",
  endpoint: "http://localhost:8000"
}

const isOffline = () => process.env.IS_OFFLINE;

const dynamoDb = isOffline()
  ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
  : new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: process.env.PACIENTES_TABLE,
};

function handlerResponse(statusCode, body) {
  let response = { statusCode }

  if (body) {
    response['body'] = body
  }

  return response
}

module.exports.listar = async (event) => {
  try {
    const usuario_id = '123'

    const queryString = {
      limit: 5,
      ...event.queryStringParameters
    }

    const { limit, next } = queryString

    let localParams = {
      ...params,
      FilterExpression: "usuario_id = :usuario_id",
      ExpressionAttributeValues: {
        ":usuario_id": usuario_id,
      },
      Limit: limit
    }

    if (next) {
      localParams.ExclusiveStartKey = {
        usuario_id: usuario_id,
        paciente_id: next
      }
    }

    let data = await dynamoDb.scan(localParams).promise();

    let nextToken = data.LastEvaluatedKey != undefined
      ? data.LastEvaluatedKey.paciente_id
      : null;

    const result = {
      items: data.Items,
      next_token: nextToken
    }

    return handlerResponse(200, JSON.stringify(result))

  } catch (err) {
    console.log("Error", err);

    return handlerResponse(
      err.statusCode ? err.statusCode : 500,
      JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      })
    )
  }
};

module.exports.obter = async (event) => {
  try {
    const { pacienteId } = event.pathParameters;

    const data = await dynamoDb
      .get({
        ...params,
        Key: {
          usuario_id: '123',
          paciente_id: pacienteId,
        },
      })
      .promise();

    if (!data.Item) {
      return handlerResponse(404, JSON.stringify({ error: "Paciente não existe" }, null, 2))
    }

    const paciente = data.Item;

    return handlerResponse(200, JSON.stringify(paciente, null, 2))
  } catch (err) {
    console.log("Error", err);

    return handlerResponse(
      err.statusCode ? err.statusCode : 500,
      JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      })
    )
  }
};

module.exports.cadastrar = async (event) => {
  try {
    const timestamp = new Date().getTime();

    let dados = JSON.parse(event.body);

    const { nome, data_nascimento, email, telefone } = dados;

    const paciente = {
      usuario_id: '123',
      paciente_id: uuidv4(),
      nome,
      data_nascimento,
      email,
      telefone,
      status: true,
      criado_em: timestamp,
      atualizado_em: timestamp,
    };

    await dynamoDb
      .put({
        ...params,
        Item: paciente,
      })
      .promise();

    return handlerResponse(201, null)
  } catch (err) {
    console.log("Error", err);

    return handlerResponse(
      err.statusCode ? err.statusCode : 500,
      JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      })
    )
  }
};

module.exports.atualizar = async (event) => {
  const { pacienteId } = event.pathParameters

  try {
    const timestamp = new Date().getTime();

    let dados = JSON.parse(event.body);

    const { nome, data_nascimento, email, telefone } = dados;

    await dynamoDb
      .update({
        ...params,
        Key: {
          usuario_id: '123',
          paciente_id: pacienteId
        },
        UpdateExpression:
          'SET nome = :nome, data_nascimento = :dt, email = :email,'
          + ' telefone = :telefone, atualizado_em = :atualizado_em',
        ConditionExpression: 'attribute_exists(paciente_id)',
        ExpressionAttributeValues: {
          ':nome': nome,
          ':dt': data_nascimento,
          ':email': email,
          ':telefone': telefone,
          ':atualizado_em': timestamp
        }
      })
      .promise()

    return handlerResponse(204, null)
  } catch (err) {
    console.log("Error", err);

    let error = err.name ? err.name : "Exception";
    let message = err.message ? err.message : "Unknown error";
    let statusCode = err.statusCode ? err.statusCode : 500;

    if (error == 'ConditionalCheckFailedException') {
      error = 'Paciente não existe';
      message = `Recurso com o ID ${pacienteId} não existe e não pode ser atualizado`;
      statusCode = 404;
    }

    return handlerResponse(
      statusCode,
      JSON.stringify({ error, message })
    )
  }
};

module.exports.excluir = async event => {
  const { pacienteId } = event.pathParameters

  try {
    await dynamoDb
      .delete({
        ...params,
        Key: {
          usuario_id: '123',
          paciente_id: pacienteId
        },
        ConditionExpression: 'attribute_exists(paciente_id)'
      })
      .promise()

    return handlerResponse(204, null)
  } catch (err) {
    console.log("Error", err);

    let error = err.name ? err.name : "Exception";
    let message = err.message ? err.message : "Unknown error";
    let statusCode = err.statusCode ? err.statusCode : 500;

    if (error == 'ConditionalCheckFailedException') {
      error = 'Paciente não existe';
      message = `Recurso com o ID ${pacienteId} não existe e não pode ser atualizado`;
      statusCode = 404;
    }

    return handlerResponse(
      statusCode,
      JSON.stringify({ error, message })
    )
  }
}
