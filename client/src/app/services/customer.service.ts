import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from '../interfaces/Customer';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.BASE_URL}/customer`);
  }

  getCustomer(id: string): Observable<Customer>{
    return this.http.get<Customer>(`${this.BASE_URL}/customer/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}/customer/create`, customer);
  }

  deleteCustomer(id: string): Observable<Customer> {
    console.log(id);
    return this.http.delete<Customer>(`${this.BASE_URL}/customer/delete?customerID=${id}`);
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.BASE_URL}/customer/update?customerID=${id}`, customer);
  }

}
