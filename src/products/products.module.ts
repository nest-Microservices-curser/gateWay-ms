import { Module } from '@nestjs/common';
import { ProductsController } from './prodcuts.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [NatsModule]

})
export class ProductsModule { }
