import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeuCepService {
  constructor(private http: HttpClient) {}

  localizacep(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    return this.http.get(url, header);
  }
}
