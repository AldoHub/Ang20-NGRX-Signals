import { Component, inject, OnInit} from '@angular/core';
import { AddEmployee } from '../add-employee/add-employee';
//material
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../services/employee-service';

import { EmployeeModel } from '../../models/Employee.model';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';


@Component({
  selector: 'app-employee',
  imports: [MatCardModule, MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit {

  constructor() { }
 
  employeesService: EmployeeService = inject(EmployeeService);
  //datasource of the component
  dataSource!: MatTableDataSource<EmployeeModel>;
  columns: string[] = ['id','name', 'doj', 'age', 'salary', 'role', 'actions'];

  //dialog instance
  private dialog: MatDialog = inject(MatDialog);


  //add employee
  addEmployee(): void{
    console.log('add employee');
    this.dialog.open(AddEmployee, {
      width: '50%',
    });
  }
  

  //get all employees
  getEmployees(){
   this.employeesService.getEmployees().subscribe(res => {
    console.log(res);
     //update sevice signal to load the inital data
     this.employeesService.employeesSignal.set(res);
     //set the service datasource
     this.employeesService.dataSource.data = res;
     //set the component datasource
     this.dataSource = this.employeesService.dataSource;
    });
  }

  //edit employee
  editEmployee(employee: EmployeeModel): void{
    console.log('edit employee');
    this.dialog.open(AddEmployee, {
      width: '50%',
      data: employee
    });
   
  }

  //delete employee
  deleteEmployee(employeeId: number): void{
    this.employeesService.deleteEmployee(employeeId).subscribe(res => {
      console.log('delete employee', res);
      //filter out the employee id to update the shared signal on the service
      let filteredEmployees = this.employeesService.employeesSignal().filter(employee => employee.id !== employeeId);
      this.employeesService.employeesSignal.set(filteredEmployees);
      //reset the service datasource
      this.employeesService.dataSource.data = filteredEmployees;
      //update the component datasource
      this.dataSource = this.employeesService.dataSource;
      
    });
    
  }

  //on load
  ngOnInit(): void {
    this.getEmployees();
  }

  


}

