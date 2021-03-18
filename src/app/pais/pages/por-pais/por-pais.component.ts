import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerido: boolean = false;
  busqueda: string = '';

  constructor( private paisService: PaisService) { }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino)
      .subscribe((paises) => {
        this.hayError = false;
        this.paisesSugeridos = [];
        this.paises = paises;
      }, (err) => {
        this.hayError = true;
        console.log(err);
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.mostrarSugerido = true;
    this.busqueda = termino;
    const numSugerencias = 9;
    this.paisService.buscarPais(termino)
      .subscribe(
        paises => this.paisesSugeridos = paises.splice(0, numSugerencias),
        err => this.paisesSugeridos = []
    );
  }
}
