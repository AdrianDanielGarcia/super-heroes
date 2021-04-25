import { Injectable } from "@angular/core";
import { ISuperHero, ISuperHeroesResponse } from "@models/super-hero.model";

@Injectable()
export class SuperHeroesMockArray {
  private superHeroresData: ISuperHero[] = [
  {
    id: 1,
    name: 'Superman',
    franchise: 'DC Comics',
    authors: 'Jerry Siegel & Joe Shuster',
  },
  {
    id: 2,
    name: 'Batman',
    franchise: 'DC Comics',
    authors: 'Bob Kane & Bill Finger',
  },
  { id: 3, name: 'Spiderman', franchise: 'Marvel', authors: 'Stan Lee' },
  { id: 4, name: 'Iron Man', franchise: 'Marvel', authors: 'Stan Lee' },
  {
    id: 5,
    name: 'Mujer Maravilla',
    franchise: 'DC Comics',
    authors: 'William Moulton Marston',
  },
  {
    id: 6,
    name: 'Linterna Verde',
    franchise: 'DC Comics',
    authors: 'Bill Finger & Martin Nodell',
  },
  {
    id: 7,
    name: 'Gatubela',
    franchise: 'DC Comics',
    authors: 'Bill Finger & Bob Kane',
  },
  {
    id: 8,
    name: 'Flash',
    franchise: 'King Features Syndicate ',
    authors: 'Alex Raymond',
  },
  {
    id: 9,
    name: 'Supergirl',
    franchise: 'DC Comics',
    authors: 'Otto Binder & Al Plastino',
  },
  { id: 10, name: 'Hulk', franchise: 'Marvel', authors: 'Stan Lee' },
  { id: 10, name: 'Thor', franchise: 'Marvel', authors: 'Stan Lee' },
  { id: 11, name: 'Daredevil', franchise: 'Marvel', authors: 'Stan Lee' },
  {
    id: 12,
    name: 'Doctor Strange',
    franchise: 'Marvel',
    authors: 'Stan Lee',
  },
  { id: 13, name: 'Pantera Negra', franchise: 'Marvel', authors: 'Stan Lee' },
];

  public getAll(): ISuperHeroesResponse {
    return {
      totalCount: this.superHeroresData.length,
      pageNumber: 1,
      pageLength: this.superHeroresData.length,
      response: [...this.superHeroresData]
    }
  }

  public getCount():number {
    return this.superHeroresData.length;
  }

  public getPage(pageNumber: number, pageLength: number): ISuperHeroesResponse {
    // TODO: check params!!!!
    const from = (pageNumber - 1) * pageLength;
    const to = pageNumber * pageLength;
    return {
      totalCount: this.superHeroresData.length,
      pageNumber: pageNumber,
      pageLength: pageLength,
      response: this.superHeroresData.slice(from, to)
    }
  }

  public getFilteredPage(filter: string, pageNumber: number, pageLength: number): ISuperHeroesResponse {
    // TODO: check params!!!!
    const from = (pageNumber - 1) * pageLength;
    const to = pageNumber * pageLength;
    const data = this.superHeroresData
    .filter(heroe =>
      heroe.name.toUpperCase().includes(filter.toUpperCase().trim()
    ));
    return {
      totalCount: data.length,
      pageNumber: pageNumber,
      pageLength: pageLength,
      response: data.slice(from, to)
    }
  }

  public getFlitered(filter: string): ISuperHeroesResponse  {
    // TODO: check params!!!!
    const data = this.superHeroresData
      .filter(heroe =>
        heroe.name.toUpperCase().includes(filter.toUpperCase().trim()
      ));
    return {
      totalCount: data.length,
      pageNumber: 1,
      pageLength: data.length,
      response: [...data]
    }
  }

  public getOne(id: number): ISuperHero {
    // TODO: check params!!!!
    return {
      ...this.superHeroresData.find(hero => hero.id === id)
    }
  }

  public delete(id: number) {
    const index = this.superHeroresData.findIndex(hero => hero.id === id);
    // TODO: check index
    this.superHeroresData.splice(index, 1);
    return {totalCount: this.superHeroresData.length};
  }

  public update(hero: ISuperHero) {
    let index = this.superHeroresData.findIndex( item => item.id === hero.id);
    this.superHeroresData[index] = hero;
    return hero;
  }

  public add(hero: ISuperHero): ISuperHero {
    hero.id = this.superHeroresData[this.superHeroresData.length - 1].id + 1;
    this.superHeroresData.push(hero);
    return hero;
  }

}
