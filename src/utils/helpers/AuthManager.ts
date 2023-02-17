import { ProjectConsts } from "../consts/ProjectConsts";

export class AuthManager {
  static logout(): void {
    localStorage.removeItem(ProjectConsts.TokenStorageKey);
  }

  static getToken(): string | null {
    return localStorage.getItem(ProjectConsts.TokenStorageKey);
  }

  static hasToken = (): boolean => {
    let token = this.getToken();
    return token !== null;
  };

  static hasNotToken = (): boolean => {
    return !AuthManager.hasToken();
  };
}
