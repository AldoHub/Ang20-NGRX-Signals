import { createAction, props } from "@ngrx/store";
import { EmployeeModel } from "../models/Employee.model";

//load all employees
export const LOAD_ALL_EMPLOYEES = 'LOAD_ALL_EMPLOYEES';
export const LOAD_ALL_EMPLOYEES_SUCCESS = 'LOAD_ALL_EMPLOYEES_SUCCESS';
export const LOAD_ALL_EMPLOYEES_FAIL = 'LOAD_ALL_EMPLOYEES_FAIL';

export const loadAllEmployees = createAction(LOAD_ALL_EMPLOYEES);
export const loadAllEmployeesSuccess = createAction(LOAD_ALL_EMPLOYEES_SUCCESS, props<{employeeList:EmployeeModel[]}>());
export const loadAllEmployeesFail = createAction(LOAD_ALL_EMPLOYEES_FAIL, props<{error: any}>());

//delete employee
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_FAIL = 'DELETE_EMPLOYEE_FAIL';

export const deleteEmployee = createAction(DELETE_EMPLOYEE, props<{employeeId:number}>());
export const deleteEmployeeSuccess = createAction(DELETE_EMPLOYEE, props<{employeeId:number}>());
export const deleteEmployeeFail = createAction(DELETE_EMPLOYEE_FAIL, props<{error: any}>());

//add employee
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
export const ADD_EMPLOYEE_FAIL = 'ADD_EMPLOYEE_FAIL';

export const addEmployee = createAction(ADD_EMPLOYEE, props<{employee:EmployeeModel}>());
export const addEmployeeSuccess = createAction(ADD_EMPLOYEE_SUCCESS, props<{employee:EmployeeModel}>());
export const addEmployeeFail = createAction(ADD_EMPLOYEE_FAIL, props<{error: any}>());


//edit employee
export const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE';
export const EDIT_EMPLOYEE_SUCCESS = 'EDIT_EMPLOYEE_SUCCESS';
export const EDIT_EMPLOYEE_FAIL = 'EDIT_EMPLOYEE_FAIL';

export const editEmployee = createAction(EDIT_EMPLOYEE, props<{employee:EmployeeModel}>());
export const editEmployeeSuccess = createAction(EDIT_EMPLOYEE, props<{employee:EmployeeModel}>());
export const editEmployeeFail = createAction(EDIT_EMPLOYEE_FAIL, props<{error: any}>());

export const employeeActions = {
    loadAllEmployees,
    loadAllEmployeesSuccess,
    loadAllEmployeesFail,
    deleteEmployee,
    deleteEmployeeSuccess,    
    deleteEmployeeFail,
    addEmployee,
    addEmployeeSuccess,
    addEmployeeFail,
    editEmployee,
    editEmployeeSuccess,
    editEmployeeFail
};