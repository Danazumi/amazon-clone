import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document

//we'll annotate our class as a schema
@Schema()
export class Product {
    @Prop({required: true})
    name:string
    @Prop({required: true})
    price:number
    @Prop()
    description:string

} 

//Here we generate Mongoose Schema
export const ProductSchema = SchemaFactory.createForClass(Product)

//ID is auto generated for us
// @Prop tells mongoose how to store the property
//model is an instance of that schema that interacts with the database