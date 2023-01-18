import { EmployeeDTO } from '../dtos/employee.dto';
import { StatusModel } from './status.model';

export class EmployeeModel {
  public id: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public birthDate: string;
  public basicSalary: string;
  public status: StatusModel;
  public group: string;
  public description: string;
  public createdAt: string;
  private constructor() {}
  public static create(dto: EmployeeDTO): EmployeeModel {
    let model = new EmployeeModel();
    if (!dto) return model;
    const {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      basic_salary: basicSalary,
      create_at: createdAt,
      status,
      ...props
    } = dto;
    model = {
      ...props,
      firstName,
      lastName,
      birthDate,
      basicSalary,
      createdAt,
      status: StatusModel.getByName(status),
    };
    return model;
  }

  public static createEmpty(): EmployeeModel {
    return new EmployeeModel();
  }
}
