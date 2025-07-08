import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal} from '@angular/core';
import { EmployeeModel } from '../models/Employee.model';
import { Observable } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  httClient:HttpClient = inject(HttpClient);
  endpoint = 'http://localhost:3000/employees';
  employeesSignal: WritableSignal<EmployeeModel[]> = signal<EmployeeModel[]>([]);
  dataSource: MatTableDataSource<EmployeeModel> = new MatTableDataSource<EmployeeModel>([]);

  //get all employees
  getEmployees(): Observable<EmployeeModel[]>{
    return this.httClient.get<EmployeeModel[]>(this.endpoint);
  }

  //get an employee
  getEmployee(id:number){
    return this.httClient.get<EmployeeModel>(this.endpoint+'/'+id);
  }

  //create an employee
  createEmployee(employee:EmployeeModel){
    return this.httClient.post<EmployeeModel>(this.endpoint, employee);
  }

  //update an employee
  updateEmployee(employee:EmployeeModel){
    return this.httClient.put<EmployeeModel>(this.endpoint+'/'+employee.id, employee);
  }

  //delete an employee
  deleteEmployee(id:number){
    return this.httClient.delete<EmployeeModel>(this.endpoint+'/'+id);
  }
}
