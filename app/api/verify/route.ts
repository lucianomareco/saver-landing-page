import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../utils/connection'
import Users from '../../../models/Users'
import * as CryptoJS from 'crypto-js';

function decrypt(ciphertext: string): string {
  // Decodifica el ciphertext de la URL
  const decodedCiphertext = decodeURIComponent(ciphertext);

  // Utiliza tu clave secreta almacenada en las variables de entorno
  const secretKey = process.env.SEED!;
  
  // Desencripta el texto
  const bytes = CryptoJS.AES.decrypt(decodedCiphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

dbConnect()

// eslint-disable-next-line import/no-anonymous-default-export
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const id = body?.id
    if (typeof id !== 'string') throw new Error('id is required')

    const decryptedId = decrypt(id)
    await Users.findOneAndUpdate({_id: decryptedId}, {status: 'validated'})

    return new Response('ok')
  } catch (error) {
    console.log(error)
    return new Response('No Response for This Request')
   }
}
