import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  colecaoEnderecos: any[] = [];
  key = 'enderecos';

  constructor() {}

  salvarEndereco(
    ruas: string,
    numeros: string,
    ceps: string,
    complementos: string,
    bairros: string,
    cidades: string,
    estados: string
  ) {
    const dados = {
      rua: ruas,
      nmr: numeros,
      cep: ceps,
      comp: complementos,
      bairro: bairros,
      city: cidades,
      uf: estados,
    };

    const values = localStorage.getItem(this.key);

    if (!values) {
      this.colecaoEnderecos.push(dados);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoEnderecos));
    } else {
      const colecao: any[] = this.listar()!;
      colecao.push(dados);
      localStorage.setItem(this.key, JSON.stringify(colecao));
    }
  }

  listar() {
    const values = localStorage.getItem(this.key);

    if (!values) return;

    const colecao: any[] = JSON.parse(values);
    return colecao;
  }

  deletar(params: any) {
    const values = this.listar();
    const result = values?.filter((endereco) => endereco.cep !== params);

    localStorage.setItem(this.key, JSON.stringify(result));
  }
}
