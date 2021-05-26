export function getPatient(id) {
  return new Promise(function (resolve) {
    resolve({
      paciente_id: "72435d91-6dd1-4348-97b7-7de87681b727",
      nome: "Ada Lovace",
      data_nascimento: "1815-12-10",
      telefone: "+5511923450000",
      email: "ada@gmail.com",
    });
  });
}

export function getAllPatients() {
  return new Promise(function (resolve) {
    resolve({
      items: [
        {
          paciente_id: "72435d91-6dd1-4348-97b7-7de87681b727",
          nome: "Ada Lovace",
          data_nascimento: "1815-12-10",
          telefone: "+5511923450000",
          email: "ada@gmail.com",
        },
      ],
    });
  });
}

export function createPatient(data) {
  return new Promise(function (resolve) {
    resolve({
      body: data,
    });
  });
}

export function savePatient(id, data) {
  return new Promise(function (resolve) {
    resolve({
      body: data,
    });
  });
}

export function deletePatient(id) {
  return new Promise(function (resolve) {
    resolve("ok");
  });
}
