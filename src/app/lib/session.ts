import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { SessionPayload } from './definitions'

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

export async function updateSession(payload: any) {

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  console.log("SESSION", session);

  if (session) {
  //   // Update the existing session data with new profile data
    const updatedSession = {
      ...session,
      user: payload,
      token: session.token as string
    };

    console.log("updatedSession", updatedSession);
    const newSessionToken = await encrypt(updatedSession);

    cookies().set('session', newSessionToken, {
      httpOnly: true,
      // secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
  }
}


export function deleteSession() {
  cookies().delete('session')
}

export const getSession = async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (session?.user) {
    return { auth: true, user: session.user, token: session.token }
  }

  return null
}

