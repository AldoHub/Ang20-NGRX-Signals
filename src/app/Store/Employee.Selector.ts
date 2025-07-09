import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeState } from "./Employee.Model";

//get the part of the state needed
const getEmployeesState = createFeatureSelector<EmployeeState>('employeesStore');
export const getEmployees = createSelector(getEmployeesState, state => state.employeesList);