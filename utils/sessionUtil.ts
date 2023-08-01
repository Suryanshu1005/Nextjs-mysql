import jwt from 'jsonwebtoken';

export function getSessionUser() {
    if (typeof window !== 'undefined') {
      const sessionUser = localStorage.getItem('access_token');
      return sessionUser || '{}';
    }
    return '{}';
  }

export function decodeJWT(token : any) {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}




  