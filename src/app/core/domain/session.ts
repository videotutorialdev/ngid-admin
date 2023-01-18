import { UserModel } from '../models/user.model';

export class Session {
  public token: string | null;
  public lang: string;
  public user: UserModel;
  constructor() {}

  public get isLoggedIn(): boolean {
    return !!this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public setUser(user: UserModel): void {
    this.user = user;
  }

  public destroy(): void {
    this.token = null;
    this.user = UserModel.createEmpty();
  }
}
