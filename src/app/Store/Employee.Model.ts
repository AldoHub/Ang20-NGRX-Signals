import { EmployeeModel } from '../models/Employee.model';

export interface EmployeeState {
    employeesList: EmployeeModel[];
    errorMessage: string;
}

export const initialState: EmployeeState = {
    employeesList: [],
    errorMessage: '',
};