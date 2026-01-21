import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// funcion para obtener el token de autenticacion almacenado en el localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Configuración base de headers
function authHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  };
}

// funcion para obtener la lista de clientes
export async function fetchClients() {
  const res = await axios.get(`${API}/clientes`, authHeaders());
  return res.data;
}

// funcion para crear un nuevo cliente
export async function createClient(data) {
  const res = await axios.post(`${API}/clientes`, data, authHeaders());
  return res.data;
}

// funcion para actualizar un cliente
export async function updateClient(id, data) {
  const res = await axios.put(`${API}/clientes/${id}`, data, authHeaders());
  return res.data;
}

// funcion para eliminar un cliente
export async function deleteClient(id) {
  const res = await axios.delete(`${API}/clientes/${id}`, authHeaders());
  return res.data;
}
