import { ApiProperty } from "@nestjs/swagger";
export class UserDetailDto {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    fullName: string;
}