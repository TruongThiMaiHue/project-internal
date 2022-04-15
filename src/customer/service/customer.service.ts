import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  
  async downloadFile() {
    const customers = await this.customerRepository.find()
    
    let row = []

    customers.forEach(doc => {
     row.push(Object.values(doc))
    })
    let workbook = new Workbook(); 
    let worksheet = workbook.addWorksheet('Customers'); 
    row.unshift(Object.keys(customers[0]))
    worksheet.addRows(row)

    let File = await new Promise((resolve, reject) => {
      tmp.file({ discardDescriptor: true, prefix: 'MyExcelSheet', postfix: '.xlsx', mode: parseInt('0600', 8) }, async(err, file) => {
        if (err){
          throw new BadRequestException(err);
        }
        workbook.xlsx.writeFile(file).then(_ => {
          resolve(file)
        }).catch(err => {
          throw new BadRequestException(err);
        })
      })
    })
    return File
  }

}
