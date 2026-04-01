import { UserService } from "../services/user.service";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getUser(request: { params: { id: string } }, response: any): Promise<void> {
    const userId = request.params.id;
    console.log(`Incoming API Request for User ID: ${userId}`);

    try {
      const user = await this.userService.getUserById(userId);

      response.status(200).json(user);
      
    } catch (error: any) {
      console.error(`Caught error bubbling up from Service layer: "${error.message}"`);
      
      response.status(500).json({
        success: false,
        message: "Internal Server Error while communicating with Database."
      });
    }

    console.log("Request Processing Complete");
  }
}
