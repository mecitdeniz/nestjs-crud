import { Body, Controller, Get, Header, HttpCode, Param, Post, Query, Redirect } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dtos/create-cat.dto";
import { Cat } from './interfaces/cat.interface';

@Controller('/cats')
export class CatsController {
    constructor(private catsService : CatsService){}

    @Get()
    async findAll(): Promise<Cat[]> {
        return await this.catsService.findAll();
    }

    @Post()
    @HttpCode(201)
    @Header('Cache-Control', 'none')
    async create(@Body() createCatDto : CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get(':id')
    getById(@Param('id') id): string {
        return `This action return a cat by id. The id sent is ${id}`;
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com',302)
    getDocs(@Query('version') version) {
        if( version && version === '5' ) {
            return { url : 'https://docs.nestjs.com/v5/'}
        }
    }
}