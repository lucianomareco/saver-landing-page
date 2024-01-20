import axios from 'axios'
import { User } from '../interfaces'

const CLIENT_NAME: string = process.env.BACKEND_URL ?? ''

export const createUser = async ({ email, profession, username }: User) => {
  const config = {
    method: 'POST',
    url: `${CLIENT_NAME}/api`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email,
      profession,
      username
    }
  }
  const { data } = await axios(config)
  return data
}


export const verifyUser = async (id: string) => {
  const config = {
    method: 'POST',
    url: `${CLIENT_NAME}/api/verify`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id
    }
  }
  const { data } = await axios(config)
  return data
}