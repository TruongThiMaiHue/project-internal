import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { Workbook } from 'exceljs';
import { Stream } from 'stream';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  
  async downloadFile(res: Stream): Promise<void> {
    const customers = await this.customerRepository.find()
    let row = []
    customers.forEach(customer => {
      row.push(Object.values(customer))
    })
    let workbook = new Workbook()
    let worksheet = workbook.addWorksheet('Customers')
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NAME', key: 'name', width: 20 },
      { header: 'ADDRESS', key: 'address', width: 20},
      { header: 'AGE', key: 'age', width: 10},
      { header: 'CREATE AT', key: 'create_at', width: 20}
    ]
    worksheet.addRows(row)
    return await workbook.xlsx.write(res)
  }

}
