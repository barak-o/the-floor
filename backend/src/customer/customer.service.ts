import { Injectable } from '@nestjs/common';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Customer } from "./interfaces/customer.interface";
import { CreateCustomerDTO } from "./dto/customer.dto";

@Injectable()
export class CustomerService {

    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {}

    // Get all customers
    async getCustomers(): Promise<Customer[]> {
        const customers = await this.customerModel.find();
        return customers;
    }
    
    // Get a single Customer
    async getCustomer(customerID: string): Promise<Customer> {
        const customer = await this.customerModel.findById(customerID); 
        return customer;
    }

    // Post a single customer
    async createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const newCustomer = new this.customerModel(createCustomerDTO);
        return newCustomer.save();
    }

    // Delete Customer
    async deleteCustomer(customerID: string): Promise<any> {
        const deletedCustomer = await this.customerModel.findByIdAndDelete(customerID);
        return deletedCustomer;
    }

    // Put a single customer
    async updateCustomer(customerID: string, createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const updatedCustomer = await this.customerModel
                            .findByIdAndUpdate(customerID, createCustomerDTO, {new: true});
        return updatedCustomer;
    }

}
