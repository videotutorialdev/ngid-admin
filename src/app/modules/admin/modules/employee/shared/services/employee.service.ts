import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserResponseDTO } from 'src/app/core/dtos';
import { HttpClientService } from 'src/app/core/service/http-client.service';
import { EmployeeDTO } from '../dtos/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private _httpClientService: HttpClientService) {}

  public getById(id: string): Observable<EmployeeDTO> {
    return this._httpClientService.get<EmployeeDTO>(`/employees/${id}`);
  }

  public getByEmail(email: string): Observable<UserResponseDTO> {
    return this._httpClientService
      .get<Array<UserResponseDTO>>(`/employees?email=${email}`)
      .pipe(map((users) => users[0]));
  }

  public getByUsername(username: string): Observable<UserResponseDTO> {
    return this._httpClientService
      .get<Array<UserResponseDTO>>(`/employees?username=${username}`)
      .pipe(map((users) => users[0]));
  }

  public save(dto: EmployeeDTO): Observable<EmployeeDTO> {
    return this._httpClientService.post<EmployeeDTO>('/employees', dto);
  }

  public update(id: string, dto: EmployeeDTO): Observable<EmployeeDTO> {
    return this._httpClientService.put<EmployeeDTO>(`/employees/${id}`, dto);
  }

  public deleteById(id: string): Observable<EmployeeDTO> {
    return this._httpClientService.delete<EmployeeDTO>(`/employees/${id}`);
  }
}
