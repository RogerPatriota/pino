import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { schemas } from './schemas'

const client = process.env.POSTGRES_CONNECTION

export const db = drizzle(client, {
    schema: schemas,
    casing: 'snake_case'
})