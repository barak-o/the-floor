import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customer: Customer = {    
    number: '',
    name: '',
    address: '',
    phone: ''
  };
    edit: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.customerService.getCustomer(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.customer = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  submitCustomer() {
    this.customerService.createCustomer(this.customer)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => console.log(err)
      )
  }

  updateCustomer() {
    
    this.customerService.updateCustomer(this.customer._id, this.customer)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/customer'])
        },
        err => console.log(err)
      )
  }

}
