import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PontoInteresseModel } from '../models/ponto-interesse.model';

@Injectable({
  providedIn: 'root'
})
export class PoisService {

  URL_API: string = 'https://challenge-backend.mobi7.io'

  constructor(
    private http: HttpClient
  ) { }

  public getPOI(): Observable<Array<PontoInteresseModel>> {
    return this.http.get<Array<PontoInteresseModel>>(`${this.URL_API}/pois`);
  }
}
