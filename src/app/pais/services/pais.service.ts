import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2';

  get shortParams() {
    return new HttpParams().set('fields', 'name;capital;alpha2Code;flag;population');
  }

  constructor( private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${termino}`;

    return this.http.get<Country[]>(url, {params: this.shortParams});
  }

  porCapital(termino: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${termino}`;

    return this.http.get<Country[]>(url, {params: this.shortParams});
  }

  getPaisAlpha(codigoPais: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${codigoPais}`;

    return this.http.get<Country>(url);
  }

  getPaisRegion(region: string): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${region}`;

    return this.http.get<Country[]>(url, {params: this.shortParams});
  }

}
