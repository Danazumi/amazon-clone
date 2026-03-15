import { Body, Post, Get, Controller, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDocument } from './product.schema';
import { DeleteResult } from 'mongoose';

//"localhost:3000/products"
@Controller('product')
export class ProductController {
    //use DI to consume ProductService 
    constructor(private  productService : ProductService){}


    @Post()
    createProduct( //create method w any name 
        //we will have 3 diff props in the Body
        @Body('name') name : string,
        @Body('price') price : number,
        @Body('description') description?: string,
    ) : Promise<ProductDocument>
    {
        return this.productService.create(name, price, description)
    }

    @Get()
    findAllproducts(   
    ) : Promise<ProductDocument[]>
    {
        return this.productService.findAll()
    }

    @Get(':id')
    findProduct(@Param('id') id :string) : Promise<ProductDocument | null>
    {
        return this.productService.find(id)
    }

    @Patch(':id')
    updateProduct(
    @Param('id') id :string,
    @Body('name') name : string,
    @Body('price') price : number,
     @Body('description') description?: string,

) : Promise<ProductDocument | null>
    {
        return this.productService.update(id, name , price, description)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id :string) : Promise<DeleteResult>
    {
        return this.productService.delete(id)

    }

       @Post(':id')
    softDelete(@Param('id') id :string) : Promise<DeleteResult>
    {
        return this.productService.delete(id)

    }


}







//If you make post req to "localhost:3000/products" it will detect the Post req and reun the method beneath