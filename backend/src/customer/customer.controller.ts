import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, UseInterceptors } from '@nestjs/common';
import { CustomerService } from "./customer.service";
import { MorganInterceptor } from 'nest-morgan';

import { CreateCustomerDTO } from "./dto/customer.dto";

@Controller('customer')
export class CustomerController {

    constructor(private customerService: CustomerService) { }

    // Add Customer: /customer/create
    @Post('/create')
    async createCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
        
        const customer = await this.customerService.createCustomer(createCustomerDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Customer Successfully Created',
            customer
        });
    }

    // Get Customers /customer
    // @Get('/list')
    @Get('/')
    async getCustomers(@Res() res) {
        const customers = await this.customerService.getCustomers();
        return res.status(HttpStatus.OK).json(customers);
    }

    // GET single customer: /customer/5c9d46100e2e5c44c444b2d1
    @Get('/:customerID')
    async getCustomer(@Res() res, @Param('customerID') customerID) {
        const customer = await this.customerService.getCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json(customer);
    }

    // Delete Customer: /delete?customerID=5c9d45e705ea4843c8d0e8f7
    @UseInterceptors(MorganInterceptor('combined'))
    @Delete('/delete')
    async deleteCustomer(@Res() res, @Query('customerID') customerID) {
        const customerDeleted = await this.customerService.deleteCustomer(customerID);
        if (!customerDeleted) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Customer Deleted Successfully',
            customerDeleted
        });
    }

    // Update Customer: /update?customerID=5c9d45e705ea4843c8d0e8f7
    @Put('/update')
    async updateCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO, @Query('customerID') customerID) {
        const updatedCustomer = await this.customerService.updateCustomer(customerID, createCustomerDTO);
        if (!updatedCustomer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Customer Updated Successfully',
            updatedCustomer 
        });
    }

}
