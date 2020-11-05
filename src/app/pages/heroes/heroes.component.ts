import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor( private  heroesService: HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe( resp =>  { 
      this.heroes = resp;
      this.cargando = false;
    });
  }

  borraHeroe( heroe: HeroeModel, i: number) {

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Está seguro que desea eliminar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value) {
        this.heroes.splice(i, 1);
        this.heroesService.eliminarHeroe(heroe.id).subscribe();
      }
    });
  }



}
