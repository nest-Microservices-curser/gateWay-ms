import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';


import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto/create-order.dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { OrderStatus } from './common/interfaces/order.enum';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly OrderClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto, "createOrderDto")
    return this.OrderClient.send('createOrder', createOrderDto).pipe(
      catchError(error => {
        throw new RpcException(error)
      }
      )
    );
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.OrderClient.send('findAllOrder', paginationDto).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    );

  }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.OrderClient.send('findOneOrder', { id }).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    );

  }

  @Patch(':id')
  changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() status: { status: OrderStatus }) {
    return this.OrderClient.send('changeStatusOrder', { id, status }).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    );

  }

}
