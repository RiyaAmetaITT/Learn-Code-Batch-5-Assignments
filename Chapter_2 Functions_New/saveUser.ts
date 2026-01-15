declare const db: { insert: (table: string, user: any) => void };
declare function writeToFile(path: string, data: any): void;
declare function print(message: string): void;

function isValidUser(user) {
  return user.name !== "" && user.email !== "";
}

function saveUserToDatabase(user) {
  db.insert("Users", user);
}

function backupUserToFile(user) {
  const filePath = "/backup/users/" + user.id + ".txt";
  writeToFile(filePath, user);
}

function saveUser(user) {
  if (!isValidUser(user)) {
    print("Invalid user data");
    return;
  }

  saveUserToDatabase(user);
  backupUserToFile(user);
}
