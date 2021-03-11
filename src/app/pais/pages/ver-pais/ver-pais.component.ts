import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap } from "rxjs/operators";
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ codigoPais }) => this.paisService.getPaisAlpha(codigoPais))
      ).subscribe(resp => {
        console.log(resp);
        this.pais = resp;
      }, error => {

      });

    // this.activatedRoute.params
    //   .subscribe(({ codigoPais }) => {

    //     this.paisService.getPaisAlpha(codigoPais)
    //       .subscribe(pais => {
    //         console.log(pais);
    //       });

    //   });
  }

}
