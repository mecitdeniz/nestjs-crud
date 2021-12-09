import { Injectable, NotFoundException } from "@nestjs/common";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { RoleEntity } from "./entities/role.entity";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
    private userList: UserEntity[] = [];
    
    findAll(): UserEntity[] {
        return [...this.userList];
    }

    findById(id: number): UserEntity{
        const user = this.userList.find(user => user.id === id);
        if(!user) throw new NotFoundException;
        return new UserEntity(user);
    }

    create(user:CreateUserDto){
        const id = Date.now();
        const newUser = new UserEntity({
            id,
            firstName:user.firstName,
            lastName:user.lastName,
            password:user.password,
            role: new RoleEntity({id:1,name:"Engineer"})
        });
        this.userList.push(newUser);
        return {id:id};
    }

    deleteById(id: number){
        this.userList.map((user,index) => {
            if(user.id == id) {
                this.userList.splice(index,1);
            }
        })
        return {id, message:'Deleted successfully!'};
    }

    changePassword(id: number, changePasswordDto: ChangePasswordDto){
        this.userList.map((user) => {
            if(user.id == id) {
                user.password = changePasswordDto.newPassword;
            }
        })

        return {
            id,
            message:"Password changed."
        }
    }
}