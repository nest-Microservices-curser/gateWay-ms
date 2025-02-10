import { Module } from '@nestjs/common';
import { ProductsController } from './prodcuts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';
import { envs } from '../config/envs';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register(
      [
        {
          name: PRODUCT_SERVICE,
          transport: Transport.TCP,
          options: {
            host: envs.productMicroserviceHost,
            port: envs.productMicroservicesPort
          }
        }
      ]
    )
  ]

})
export class ProductsModule { }
