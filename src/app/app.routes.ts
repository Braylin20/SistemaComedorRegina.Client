import { Routes } from '@angular/router';
import {RegisterComponent} from './gastos/pages/register/register.component';
import {IndexGastosComponent} from './gastos/pages/index/index-gastos.component';
import {IndexVentasComponent} from './sales/pages/index/index.component';
import {RegisterVentasComponent} from './sales/pages/register/register.component';

export const routes: Routes = [
  {
    path: 'gastos/register',
    component: RegisterComponent
  },
  {
    path: 'gastos/index',
    component: IndexGastosComponent
  },
  {
    path: 'ventas/index',
    component: IndexVentasComponent
  },
  {
    path: 'ventas/register',
    component: RegisterVentasComponent
  }
];
