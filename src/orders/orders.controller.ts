import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';


import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, ORDER_SERVICE } from 'src/config';

import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { OrderStatus } from './common/interfaces/order.enum';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError(error => {
        throw new RpcException(error)
      }
      )
    );
  }


  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrder', paginationDto).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    );

  }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', { id }).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    );

  }

  @Patch(':id')
  changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() status: { status: OrderStatus }) {
    console.log(status, "status")
    console.log(id, "id")
    return this.client.send('changeStatusOrder', { id, ...status }).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    );

  }


}
