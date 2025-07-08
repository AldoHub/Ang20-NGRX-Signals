import { Routes } from '@angular/router';
import { Employee } from './components/employee/employee';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: Employee
    },
    {
        path: 'add-employee',
        loadComponent: () => import('./components/add-employee/add-employee').then(m => m.AddEmployee)
    },
    {
        path: '**',
        redirectTo: ''  
    }
];
