import dotenv from 'dotenv'
dotenv.config()

const config = {
  PORT: process.env.PORT || '3000',
  EDITOR_CODE: process.env.EDITOR_CODE || 'EDITOR',
  SECRET: process.env.SECRET || 'CATS',
  SALT_ROUNDS: Number.parseInt(process.env.SALT_ROUNDS) || 10,
  DATABASE: process.env.DATABASE
}

export default config
