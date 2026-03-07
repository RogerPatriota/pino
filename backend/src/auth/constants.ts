import 'dotenv/config'

const token = process.env.JWT_TOKEN as string

export const jwtConstants = {
  secret: token
};