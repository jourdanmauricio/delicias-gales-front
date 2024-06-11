import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { SessionPayload, User } from './definitions'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(payload: any) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  payload.expiresAt = expiresAt
  const session = await encrypt(payload)

  cookies().set('session', session, {
    httpOnly: true,
    // secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

type JWTPayload = {
  user: User,
  token: string,
}
export async function updateSession(payload: any) {
  const session = cookies().get('session')?.value
  const originalSession: JWTPayload = await decrypt(session) 
  console.log("originalSession", originalSession)

  originalSession.user = payload;


  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  payload.expiresAt = expiresAt
  
  // const newSession = await encrypt(originalSession)

  if (!session || !payload) {
    return null
  }

  // const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  cookies().set('session', session, {
    httpOnly: true,
    // secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export function deleteSession() {
  cookies().delete('session')
}

export const getSession = async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  // if (!session?.user) {
  //   redirect('/login')
  // }

  if (session?.user) {
    return { auth: true, user: session.user, token: session.token }
  }

  return null
}

