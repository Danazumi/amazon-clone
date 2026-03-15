import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from './product.schema';
import { Model, DeleteResult } from 'mongoose';



@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument> ){}

    // create the productModel
    async create(       
        name: string, 
        price: number, 
        description?: string, 
    ): Promise<ProductDocument>{
        //instanciate new object by ref to d productModel
        const newProduct = new this.productModel({name, price, description})
        return newProduct.save()
    }

    async findAll(): Promise<ProductDocument[]>{
        return this.productModel.find().exec()
    }

    async find(id : string): Promise<ProductDocument | null>{
        return this.productModel.findById(id).exec() 
    }

    async findOne(id : string): Promise<ProductDocument | null>{
        return this.productModel.findOne(id)
    }

    async update(
        id : string,
        newName: string, 
        newPrice: number, 
        newDescription?: string,
    ): Promise<ProductDocument | null>{

        let existingProduct = await this.find(id) 

        //check if existingProd exists b4 accessing its props
        if (!existingProduct){
            throw new NotFoundException('Product with ID ${d} is missing')
        }

        existingProduct.name = newName ??  existingProduct.name 
        existingProduct.price = newPrice ??  existingProduct.price 
        existingProduct.description = newDescription ??  existingProduct.description 



     
        return existingProduct.save()
    }

    async delete(id: string) : Promise<DeleteResult>{
        return this.productModel.deleteOne({_id : id}).exec()
    }
 
}


//@Injectable() means we can inject the fxtionality of this servcie into another file
//Done by injecting into the constructor of the JS/TS class that its consumed from
//constructors are mainly used for dependency injection
//B4 we can call mongoose methods we need to connect frm DB to model rep i.e Schema we referenced
//Now that model has been ref i'm able to interact w DB just using mongoose methods
//we can update all props except id
//create returns a product Document
