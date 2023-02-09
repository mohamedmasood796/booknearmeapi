
import jwt from 'jsonwebtoken'

export const generateToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT, {
    expiresIn: '1d'

  })
}