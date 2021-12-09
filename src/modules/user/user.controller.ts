import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { UserEntity } from "./entities/user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async findById(@Param('id') id): Promise<UserEntity> {
        return await this.userService.findById(parseInt(id));
    }

    @Post()
    createUser(@Body() user: CreateUserDto){
        return this.userService.create(user);
    }

    @Delete(':id')
    async deleteById(@Param('id') id): Promise<{id:number,message:string}> {
        return await this.userService.deleteById(parseInt(id));
    }

    @Patch(':id')
    async changePassword(@Param('id') id,@Body() changePasswordDto : ChangePasswordDto) {
        const user = this.userService.findById(parseInt(id));
        if(!user)  throw new NotFoundException();

        if(user.password !== changePasswordDto.password) throw new NotFoundException();

        if(changePasswordDto.newPassword !== changePasswordDto.confirmPassword) throw new NotFoundException();

        return await this.userService.changePassword(parseInt(id),changePasswordDto)
    }
}