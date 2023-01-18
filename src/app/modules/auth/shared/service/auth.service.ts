import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserResponseDTO } from 'src/app/core/dtos';
import { HttpClientService } from 'src/app/core/service/http-client.service';
import { SignInRequestDTO } from '../dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private _httpClientService: HttpClientService) {}
  public signIn(requestDTO: SignInRequestDTO): Observable<UserResponseDTO> {
    return this._httpClientService
      .get<Array<UserResponseDTO>>(
        `/users?username=${requestDTO.username}&password=${requestDTO.password}`
      )
      .pipe(map((users) => users[0]));
  }
}
