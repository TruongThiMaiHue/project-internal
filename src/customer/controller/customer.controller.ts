import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Res } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { Response } from 'express';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  
  @Get('/export')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', `attachment; filename=Customer.xlsx`)
  async exportFile(@Res() res: Response): Promise<void> {
    return await this.customerService.downloadFile(res)
  }
}
