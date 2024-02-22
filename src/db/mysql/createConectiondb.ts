import mysql from 'mysql2/promise'
import { dbConfig } from '../../config/config.ts'
export const createConnection = async (): Promise<mysql.Connection | undefined> => {
  try {
    const connection = await mysql.createConnection(
      {
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database
      }
    )
    return connection
  } catch (error) {
    console.error('Error: ', error)
  }
}
