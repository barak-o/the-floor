import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'customer',
    component: CustomerListComponent
  },
  {
    path: 'customer/create',
    component: CustomerFormComponent 
  },
   {
    path: 'customer/view/:id',
    component: CustomerFormComponent 
  },
   
  {
    path: 'customer/edit/:id',
    component: CustomerFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
