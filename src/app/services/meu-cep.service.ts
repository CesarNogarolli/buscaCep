import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MeuCepService {
  constructor(private http: HttpClient) {}

  localizacep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    return this.http.get(url, header).toPromise();
  }
}
