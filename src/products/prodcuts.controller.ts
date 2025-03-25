import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { PaginationDto } from "src/common";
import { PRODUCT_SERVICE } from "src/config";
import { CreateProductDto } from "./Dto/producto.dto";
import { UpdateProductDto } from "./Dto/update-product.dto";


@Controller('products')
export class ProductsController {

    constructor(
        //injectamos el servicio de productos
        @Inject(PRODUCT_SERVICE) private readonly ProductClient: ClientProxy
    ) { }

    @Post()
    createProduct(productDto: CreateProductDto) {
        return this.ProductClient.send({ cmd: 'create_product' }, productDto);
    }

    @Get()
    findAllProduct(@Query() paginationDto: PaginationDto) {
        //emit envia la informacion al microservicio y no espera una respuesta
        return this.ProductClient.send({ cmd: 'get_products' }, { ...paginationDto });
    }


    @Get(':id')
    async findOneProduct(@Param('id') id: string) {
        console.log('id', id);
        return this.ProductClient.send({ cmd: 'get_one_product' }, { id }).pipe(
            catchError(error => {
                throw new RpcException(error)
            }),
        );
    }

    @Patch(':id')
    updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
        console.log('id', id);
        return this.ProductClient.send({ cmd: 'update_product' }, { id: id, ...body }).pipe(
            catchError(error => {
                throw new RpcException(error)
            }),
        );
    }


    @Delete(':id')
    removeProduct(@Param('id') id: string) {
        return this.ProductClient.send({ cmd: 'delete_product' }, { id }).pipe(
            catchError(error => {
                throw new RpcException(error)
            }),
        );
    }


}
