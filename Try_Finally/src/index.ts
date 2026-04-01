import { UserController } from "./controllers/user.controller";

async function bootstrapApplication(): Promise<void> {
  console.log("=== Starting Application ===\n");

  const userController = new UserController();
  
  const mockRequest = { params: { id: "123" } };
  
  const mockResponse = {
    status: (statusCode: number) => {
      return {
        json: (data: any) => {
          console.log(`[HTTP Response] Status Code: ${statusCode}`);
          console.log(`[HTTP Response] Data Sent:`, JSON.stringify(data));
        }
      }
    }
  };

  await userController.getUser(mockRequest, mockResponse);

  console.log("\n=== Application Shutting Down ===");
}

bootstrapApplication().catch(console.error);
