import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Redirect, Req, Res } from "@nestjs/common";
import { CreateHeroDto } from "./dto/create-hero.dto";
import { UpdateHeroDto } from "./dto/update-hero.dto";

let heroes = [
    {
        id: 1,
        nama: 'Aurora',
        type: 'Mage',
        gambar: 'aurora.jpg'
    },
    {
        id: 2,
        nama: 'Zilong',
        type: 'Fighter',
        gambar: 'zilong.jpg'
    },
    {
        id: 3,
        nama: 'Akai',
        type: 'Tank',
        gambar: 'akai.jpg'
    }
];

@Controller("hero")
export class HeroController {
    @Get("index")
    @HttpCode(200)
    @Header('Content-Type', 'application/json')
    index(@Res() response) {
        response.json(heroes);
    }

    @Get("detail/:id")
    show(@Param('id') id: number) {
        const hero = heroes.filter((hero) => {
            return hero.id == id;
        })
        return hero;
    }

    @Get("create")
    create(@Res({ passthrough: true}) response): string {
        response.cookie('name', 'baledemia');
        return 'hero create';
    }

    @Post("store")
    @HttpCode(201)
    store(
        @Req() request, 
        @Body() createHeroDto: CreateHeroDto, 
        @Res({ passthrough: true }) response
    ) {
        try {
            // const { id, nama, type, gambar } = request.body;
            // heroes.push({
            //     id,
            //     nama,
            //     type,
            //     gambar
            // });
            // return heroes;
            return createHeroDto;
        } catch (error) {
            response.status(500).json({message: error});
        }
    }

    @Put("update/:id")
    update(
        @Param('id') id: number,
        @Body() updateHeroDto: UpdateHeroDto
    ) {
        heroes.filter((hero) => {
            if (hero.id == id) {
                hero.nama = updateHeroDto.nama;
                hero.type = updateHeroDto.type;
            }
        });
        return heroes;
    }

    @Delete("destroy/:id")
    destroy(@Param('id') id: number) {
        const hero = heroes.filter((hero) => {
            return hero.id != id;
        });
        return hero;
    }

    @Get("welcome")
    @Redirect('https://docs.nestjs.com')
    hello() {
        return 'welcome';
    }
}