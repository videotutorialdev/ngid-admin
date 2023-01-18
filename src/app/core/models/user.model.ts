import { UserResponseDTO } from '../dtos';
export class UserModel {
  public id: number;
  public username: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public pictureUrl: string;
  public fullName: string;
  public email: string;
  private constructor() {}
  public static create(responseDTO: UserResponseDTO): UserModel {
    let model = new UserModel();
    const {
      first_name: firstName,
      last_name: lastName,
      picture_url: pictureUrl,
      ...props
    } = responseDTO;

    model = {
      ...props,
      firstName,
      lastName,
      pictureUrl,
      fullName: `${firstName} ${lastName}`,
    };

    return model;
  }

  public static createEmpty(): UserModel {
    return new UserModel();
  }
}
