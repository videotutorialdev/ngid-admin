export class UserRequestDTO {
  public username: string;
  public password: string;
}

export class UserResponseDTO {
  public id: number;
  public username: string;
  public password: string;
  public first_name: string;
  public last_name: string;
  public picture_url: string;
  public email: string;
}
