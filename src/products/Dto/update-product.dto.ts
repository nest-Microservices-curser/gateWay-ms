import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './producto.dto';


export class UpdateProductDto extends PartialType(CreateProductDto) {

}
