
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatus, OrderStatusList } from "../common/interfaces/order.enum";
import { Transform } from "class-transformer";


export class CreateOrderDto {


    @IsNumber()
    @IsPositive()
    totalAmount: number;

    @IsNumber()
    @IsPositive()
    totalItems: number;

    @IsEnum(OrderStatusList, { message: `Status must be one of the following: ${OrderStatusList}` })
    @IsOptional()
    status: OrderStatus = OrderStatus.PENDING;

    @IsBoolean()
    @IsOptional()

    paid: boolean = false;

}
