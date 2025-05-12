import { IsNumber, IsPositive } from "class-validator";


export class OrderItemDto {
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    productId: number;
}