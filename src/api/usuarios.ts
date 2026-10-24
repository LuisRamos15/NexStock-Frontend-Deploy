import axios from "axios"
import { API_URL } from "../config"

const API_USUARIOS = `${API_URL}/usuarios`

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
})

export const getUsuarios = async () => {
  const response = await axios.get(API_USUARIOS, {
    headers: getHeaders(),
  })
  return response.data
}

export const getUsuarioById = async (id: string) => {
  const response = await axios.get(`${API_USUARIOS}/${id}`, {
    headers: getHeaders(),
  })
  return response.data
}

export const crearUsuario = async (payload: {
  nombreUsuario: string
  password: string
  roles: string[]
}) => {
  const response = await axios.post(API_USUARIOS, payload, {
    headers: getHeaders(),
  })
  return response.data
}

export const editarUsuario = async (
  id: string,
  payload: {
    nombreUsuario?: string
    roles?: string[]
    activo?: boolean
  }
) => {
  const response = await axios.patch(`${API_USUARIOS}/${id}`, payload, {
    headers: getHeaders(),
  })
  return response.data
}

export const eliminarUsuario = async (id: string) => {
  const response = await axios.delete(`${API_USUARIOS}/${id}`, {
    headers: getHeaders(),
  })
  return response.data
}