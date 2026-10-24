import axios from "axios"
import { API_URL } from "../config"

const API_AUTH = `${API_URL}/auth`

export const loginUser = async (data: {
  nombreUsuario: string
  password: string
}) => {
  const response = await axios.post(`${API_AUTH}/login`, data)
  return response.data
}