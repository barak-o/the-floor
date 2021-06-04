import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../interfaces/Customer'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

   constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  customers: Customer[];  
  
   ngOnInit() {
    
    const params = this.activatedRoute.snapshot.params;

    if (params.id) {
      this.customerService.getCustomer(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.customers = [res];
          },
          err => console.log(err)
        )
    }else{
      this.getCustomers();
    }
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(
        res => this.customers = res,
        err => console.log(err)
      )
  }

  deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id)
      .subscribe(
        res => {
          console.log(res);
          this.getCustomers();
        },
        err => console.log(err)
      )
  }

 

}
