import { createReducer, on } from "@ngrx/store";
import { employeeState } from "./Employee.State";
import { EmployeeState } from "./Employee.Model";
import { employeeActions } from "./Employee.Action";
import { deleteEmployeeSuccess } from "./Employee.Action";

//create reducer with initial state and actions handler
const employeeReducer = createReducer(employeeState, 
    on(employeeActions.loadAllEmployeesSuccess, (state, action) => ({
        ...state,
        employeesList: action.employeeList,
        errorMessage: ''
    })),
    on(employeeActions.loadAllEmployeesFail, (state, action) => ({
        ...state,
        employeesList: [],
        errorMessage: action.error
    })),
    on(employeeActions.deleteEmployeeSuccess, (state, action) => ({
        ...state,
        employeesList: state.employeesList.filter(employee => employee.id !== action.employeeId),
        errorMessage: ''
    })),
    on(employeeActions.deleteEmployeeFail, (state, action) => ({
        ...state,
        employeesList: state.employeesList,
        errorMessage: action.error
    })),
    on(employeeActions.addEmployeeSuccess, (state, action) => ({
        ...state,
        employeesList: [...state.employeesList, action.employee],
        errorMessage: ''
    })),
    on(employeeActions.addEmployeeFail, (state, action) => ({
        ...state,
        employeesList: state.employeesList,
        errorMessage: action.error
    })),
    on(employeeActions.editEmployeeSuccess, (state, action) => ({
        ...state,
        employeesList: state.employeesList.map(employee => {
            if(employee.id === action.employee.id){
                return action.employee;
            }
            return employee;
        }),
        errorMessage: ''
    })),
    on(employeeActions.editEmployeeFail, (state, action) => ({
        ...state,
        employeesList: state.employeesList,
        errorMessage: action.error
    })),

);

export function employeeReducers(state: EmployeeState | undefined, action: any) {
    return employeeReducer(state, action);
}