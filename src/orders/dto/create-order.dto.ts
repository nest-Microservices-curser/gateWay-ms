
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";

import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })// validate each item in the array
    @Type(() => OrderItemDto) // convert each item in the array to OrderItemDto

    items: OrderItemDto[];

}
