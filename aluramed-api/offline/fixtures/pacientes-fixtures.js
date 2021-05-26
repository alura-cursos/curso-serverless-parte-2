"use strict";

const { fake } = require("faker/locale/pt_BR");
const faker = require("faker/locale/pt_BR");
const fs = require('fs');
const path = require('path');

const MAX_ITEMS = 20;

const fixtureFile = path.normalize(
  path.join(__dirname, '../', 'migrations', 'pacientes-seed.json'))

const callback = err => {
  if (err) throw err;

  console.log(`Seed generated in "${fixtureFile}"`)
}

let pacientes = []

for (let i = 0; i < MAX_ITEMS; i++) {
  const name = faker.name.findName();
  const data = {
    usuario_id: '123',
    paciente_id: faker.random.uuid(),
    data_nascimento: faker.date.between('1900-01-01', '2020-01-01'),
    nome: name,
    email: name.replace(/[^A-Za-z0-9]+/, '_').toLowerCase() + '@aluramed.com',
    telefone: faker.phone.phoneNumber('+55119########'),
    status: true
  };

  pacientes.push(data);

  console.log(data);
}

fs.writeFile(fixtureFile, JSON.stringify(pacientes), 'utf8', callback);
