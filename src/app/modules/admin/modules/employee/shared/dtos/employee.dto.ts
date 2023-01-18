import { EmployeeModel } from '../models/employee.model';

export class EmployeeDTO {
  public id: string;
  public username: string;
  public first_name: string;
  public last_name: string;
  public email: string;
  public birth_date: string;
  public basic_salary: string;
  public status: string;
  public group: string;
  public description: string;
  public create_at: string;
  private constructor() {}

  public static create(model: EmployeeModel): EmployeeDTO {
    let dto = new EmployeeDTO();
    if (!model) return dto;
    const {
      firstName: first_name,
      lastName: last_name,
      birthDate: birth_date,
      basicSalary: basic_salary,
      createdAt: create_at,
      status,
      ...props
    } = model;
    dto = {
      ...props,
      first_name,
      last_name,
      birth_date,
      basic_salary,
      create_at,
      status: status.name,
    };
    return dto;
  }
}
