import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { EmployeeService } from '../services/employee-service';
import { loadAllEmployees, loadAllEmployeesSuccess, loadAllEmployeesFail, deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFail, addEmployee, addEmployeeSuccess, addEmployeeFail, editEmployee, editEmployeeSuccess, editEmployeeFail } from './Employee.Action';

@Injectable()
export class EmployeeEffects {
    private actions$ = inject(Actions);
    private employeesService = inject(EmployeeService);

    loadAllEmployees$ = createEffect(() => this.actions$.pipe(
        ofType(loadAllEmployees),
        exhaustMap(() => this.employeesService.getEmployees().pipe(
            map(employees => {
                return loadAllEmployeesSuccess({employeeList: employees});
            }),
            catchError(error => of(loadAllEmployeesFail({error})))
        ))
    ));

    deleteEmployee$ = createEffect(() => this.actions$.pipe(
        ofType(deleteEmployee),
        exhaustMap(action => this.employeesService.deleteEmployee(action.employeeId).pipe(
            map(employee => {
                return deleteEmployeeSuccess({employeeId: action.employeeId});
            }),
            catchError(error => of(deleteEmployeeFail({error})))
        ))
    ));

    createEmployee$ = createEffect(() => this.actions$.pipe(
        ofType(addEmployee),
        exhaustMap(action => this.employeesService.createEmployee(action.employee).pipe(
            map(employee => {
                console.log('create employee', employee);
                return addEmployeeSuccess({employee});
            }),
            catchError(error => of(addEmployeeFail({error})))
        ))
    ));

    updateEmployee$ = createEffect(() => this.actions$.pipe(
        ofType(editEmployee),
        exhaustMap(action => this.employeesService.updateEmployee(action.employee).pipe(
            map(employee => {
                return editEmployeeSuccess({employee});
            }),
            catchError(error => of(editEmployeeFail({error})))
        ))
    ));
    
}