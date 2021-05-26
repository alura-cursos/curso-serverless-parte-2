import { API } from "aws-amplify";

export function getPatient(id) {
  return API.get("pacientes", `/pacientes/${id}`);
}

export function getAllPatients() {
  return API.get("pacientes", "/pacientes");
}

export function createPatient(data) {
  return API.post("pacientes", "/pacientes", {
    body: data
  });
}

export function savePatient(id, data) {
  return API.put("pacientes", `/pacientes/${id}`, {
    body: data
  });
}

export function deletePatient(id) {
  return API.del("pacientes", `/pacientes/${id}`)
}
