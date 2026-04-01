export interface DatabaseConnection {
  query: (sqlQuery: string) => Promise<any>;
  release: () => void;
}

export const databasePool = {
  getConnection: async (): Promise<DatabaseConnection> => {
    console.log("Connection acquired from the database pool.");

    return {
      query: async (sqlQuery: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (sqlQuery.includes("ERROR")) {
          throw new Error("Syntax error in SQL Query executed by the database.");
        }

        return [{ id: 1, name: "Alice", email: "alice@example.com" }];
      },
      release: () => {
        console.log("Connection securely released back to the database pool.");
      },
    };
  },
};
