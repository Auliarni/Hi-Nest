import { Injectable } from "@nestjs/common";
import { Hero } from "./interface/hero.interface";

@Injectable()
export class HeroService {
    private readonly heroes: Hero[] = [
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

    create(hero: Hero) {
        this.heroes.push(hero);
    }

    // delete(hero: Hero) {
    //     this.heroes.splice(hero.id);
    // }

    findAll(): Hero[] {
        return this.heroes;
    }
}