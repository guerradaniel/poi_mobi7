import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  URL_API: string = 'https://challenge-backend.mobi7.io';

  constructor(
    private http: HttpClient
  ) {
  }

  public getPlacas(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.URL_API}/posicao/placas`);
  }

  public getPosicao(placa?: string, data?: Date): Observable<Array<any>> {
    let param = placa && data ? `?placa=${placa}&data=${data}` : placa ? `?placa=${placa}` : data ? `?data=${data}` : ``;
    return this.http.get<Array<any>>(`${this.URL_API}/posicao${param}`);
  }
}
