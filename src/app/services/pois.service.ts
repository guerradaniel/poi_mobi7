import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoisService {

  URL_API: string = 'https://challenge-backend.mobi7.io'

  constructor(
    private http: HttpClient
  ) { }

  public getPois(): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.URL_API}/pois`);
  }
}
