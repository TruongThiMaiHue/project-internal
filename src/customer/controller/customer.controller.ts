import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Res } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Response } from 'express';
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  @Header('Content-Type', 'text/xlsx')
  async exportFile(@Res() res: Response) {
    let result = await this.customerService.downloadFile()
    res.download(`${result}`)
  }
}
