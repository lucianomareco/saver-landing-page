import { Resend } from 'resend';
import { dbConnect } from '../../utils/connection'
import Users from '../../models/Users'
import * as CryptoJS from 'crypto-js';

const encrypt = async (payload: string): Promise<string> => {
  const encrypted = CryptoJS.AES.encrypt(payload, process.env.SEED!).toString();
  return encodeURIComponent(encrypted);
}

dbConnect()

// eslint-disable-next-line import/no-anonymous-default-export
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body?.email
    const profession = body?.profession
    const username = body?.username
    console.log(body)
    if (typeof email !== 'string') throw new Error('email is required')
    if (typeof profession !== 'string') throw new Error('profession is required')
    const t = await Users.create({
      email,
      username,
      profession
    })  
    const encryptedId = await encrypt(t._id.toString())

    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
      from: 'luciano@saverprotocol.com',
      to: email,
      subject: 'Welcome to Saver Protocol Waitlist',
      html: `<!DOCTYPE html>
          <html>
          <head>
              <title>Join the Saver Protocol Waitlist</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      color: #333;
                      line-height: 1.6;
                  }
          
                  .container {
                      max-width: 600px;
                      margin: 20px auto;
                      padding: 20px;
                      background-color: #fff;
                      border-radius: 10px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
          
                  .button {
                      display: inline-block;
                      padding: 12px 25px;
                      font-size: 16px;
                      cursor: pointer;
                      text-align: center;
                      text-decoration: none;
                      outline: none;
                      color: #fff;
                      background-color: #22d3ee; /* Verde agua */
                      border: none;
                      border-radius: 5px;
                      box-shadow: 0 6px #1cb3c8;
                      transition: all 0.3s ease;
                  }
          
                  .button:hover {
                      background-color: #1cb3c8;
                  }
          
                  .button:active {
                      box-shadow: 0 3px #0d8f98;
                      transform: translateY(2px);
                  }
          
                  .text-link {
                      color: #22d3ee;
                      text-decoration: none;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Welcome to Saver Protocol!</h1>
                  <p>Hello,</p>
                  <p>You're almost there! Join the exclusive waitlist of Saver Protocol and be one of the first to experience a new way of managing your digital assets.</p>
                  <a href="${process.env.FRONTEND_URL}/verify?id=${encryptedId}" class="button">Join the Waitlist</a>
                  <p>If you can't click the above button, please copy and paste the following link into your browser:</p>
                  <a href="${process.env.FRONTEND_URL}/verify?id=${encryptedId}" class="text-link">${process.env.FRONTEND_URL}/verify?id=${encryptedId}</a>
                  <p>If you did not request this, please ignore this message.</p>
                  <p>Best regards,<br>The Saver Protocol Team</p>
              </div>
          </body>
          </html>
          `
        });
        return new Response('ok')
      } catch (error) {
        console.log(error)
        return new Response('No Response for This Request', {
          status: 500
        })
      }
}
