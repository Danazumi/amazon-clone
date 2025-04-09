import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  //connect DB rep  to the object
  imports : [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]) ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
 