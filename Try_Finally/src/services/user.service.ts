import { databasePool } from "../db/database.pool";

export class UserService {
  public async getUserById(userId: string): Promise<any> {
    console.log(`Attempting to find user with ID: ${userId}...`);
    const connection = await databasePool.getConnection();

    try {
      console.log(`Executing query on acquired connection...`);

      const result = await connection.query(
        `SELECT * FROM users WHERE id = ${userId} ERROR`
      );

      return result;

    } finally {
      console.log("The finally block is running, releasing resource...");
      connection.release();
    }
  }
}
