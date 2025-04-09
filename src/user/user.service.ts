import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel : Model<UserDocument>){}

    //partial fxtion used it in conjuction w other methods
    _getUserDetails(user: UserDocument): UserDetails{
        return {
        id: user._id as string,
        name: user.name,
        email: user.email,

        }
    }

    async create(
        name : string ,
         email : string, 
         hashPassword : string
        ) : Promise<UserDocument>{
        const newUser = new this.userModel({
            name,
            email,
            password: hashPassword,
        })

    return newUser.save()

    } 

 
}



//we will inject our module here
//The userDocument has a password 
//_id gives us an error cause rather than use the regular document, we need to import mongoose document
