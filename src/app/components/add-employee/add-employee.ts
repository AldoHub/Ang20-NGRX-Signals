import { Component, inject, OnInit } from '@angular/core';
//material
import {MatCardModule} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatInput } from '@angular/material/input';
import {MatDatepickerModule, MatDatepickerToggle, MatDatepicker} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatLabel } from '@angular/material/form-field';
import { MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {ReactiveFormsModule, FormGroup, FormControl, Validators}  from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';
import { EmployeeService } from '../../services/employee-service';
import { EmployeeModel } from '../../models/Employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, MatCardModule, MatFormField, MatDatepickerModule, MatButtonModule, MatLabel, MatInput, MatHint , MatDatepickerToggle, MatIconModule, MatDatepicker, ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
  providers: [provideNativeDateAdapter()]
})
export class AddEmployee implements OnInit {

  constructor() { }

  public isEditMode = false;


  ngOnInit(): void {
    //check if is on edit or create mode - the data will be null if is on create mode
    if(this.matData){
      //if data exists, patch the form with the data
      console.log('edit employee');
      this.employeeForm.patchValue(this.matData);
      this.isEditMode = true;
    }
  }
  
  dialogRef = inject(MatDialogRef);
  matData = inject(MAT_DIALOG_DATA);
  employeesService = inject(EmployeeService);

  employeeForm = new FormGroup({
    id: new FormControl<number>(Math.floor(Math.random() * 1000), {nonNullable: true}),
    name: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    doj: new FormControl<Date>(new Date(), Validators.required),
    age: new FormControl<string>('', Validators.required),
    salary: new FormControl<string>('', Validators.required),
    role: new FormControl<string>('', Validators.required),
  });


  //add employee
  addEmployee(){
    if(this.employeeForm.valid){

      //assign the employee object
      let employee_obj: EmployeeModel =  {
          id: this.employeeForm.value.id as number,
          name: this.employeeForm.value.name as string,
          doj: new Date(this.employeeForm.value.doj as Date),
          age: parseInt(this.employeeForm.value.age as string) ,
          salary: parseInt(this.employeeForm.value.salary as string),
          role: this.employeeForm.value.role as string
      }

      if(!this.isEditMode){
        //create the employee
         console.log('add employee', this.employeeForm.value);
         this.employeesService.createEmployee(employee_obj).subscribe(res => {
            console.log('create employee', res);
            //update the service signal
            this.employeesService.employeesSignal.set([...this.employeesService.employeesSignal() ,res]);
            //update the material table datasource
            this.employeesService.dataSource.data = [...this.employeesService.dataSource.data, res];
            this.employeeForm.reset();
            this.closeDialog();
         });
      }else{
        //edit the employee
        console.log('edit employee', this.employeeForm.value);
        this.employeesService.updateEmployee(employee_obj).subscribe(res => {
          console.log('update employee', res);
          //update the service signal
          this.employeesService.employeesSignal().map(employee => {
            if(employee.id === employee_obj.id){
              //update the employee
              employee.name = employee_obj.name;
              employee.doj = employee_obj.doj;
              employee.age = employee_obj.age;
              employee.salary = employee_obj.salary;
              employee.role = employee_obj.role;
              
              return employee_obj;
            }
            return employee;
          });

          this.closeDialog();
        });
      }
       
      
    } 
      
  }
  
  //close the dialog reference
  closeDialog(){
    this.dialogRef.close();
  }




}


