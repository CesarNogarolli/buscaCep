import { Component } from '@angular/core';
import { MeuCepService } from '../services/meu-cep.service';
import { NavController, ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dados: any = {};
  endereco = {
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
  };

  labelBotao = 'cadastrar';

  constructor(
    public mensagem: ToastController,
    public nav: NavController,
    private cep: MeuCepService,
    public servico: EnderecosService
  ) {}

  ionViewDidEnter() {
    this.limpaDados();
  }

  buscaCEP(evento: any) {
    const cepDigitado = evento.detail.value;
    console.log('Obtendo os dados para o cep: ' + cepDigitado);

    if (cepDigitado.length == 8) {
      this.cep.localizacep(cepDigitado).subscribe(
        (resp) => {
          this.dados = resp;
          if (!this.dados || this.dados.erro) {
            this.exibeToast('CEP não encontrado!', 'warning');
          } else {
            this.endereco.rua = this.dados.logradouro;
            this.endereco.bairro = this.dados.bairro;
            this.endereco.cidade = this.dados.localidade;
            this.endereco.estado = this.dados.uf;
            this.endereco.complemento = this.dados.complemento;
            this.endereco.numero = this.dados.numero;
            console.log(this.endereco);
          }
        },
        (erro) => {
          this.exibeToast('CEP não encontrado!', 'warning');
        }
      );
    }
  }

  cadastrar() {
    if (
      this.endereco.cidade == '' ||
      this.endereco.estado == '' ||
      this.endereco.rua == '' ||
      this.endereco.cep == '' ||
      this.endereco.bairro == ''
    ) {
      this.exibeToast('Preencha os campos necessário.', 'danger');
    } else {
      //! Acessar uma função que salva tudo em cache:
      this.salvamento();
      this.nav.navigateForward('conclusao');
    }
  }

  //! Funação que salva as coisas no cache
  salvamento() {
    //this.enderecos.push(this.endereco);
    this.servico.salvarEndereco(
      this.endereco.rua,
      this.endereco.numero,
      this.endereco.cep,
      this.endereco.complemento,
      this.endereco.bairro,
      this.endereco.cidade,
      this.endereco.estado
    );

    /*
    Não será usada
    localStorage.setItem('rua', this.endereco.rua);
    localStorage.setItem('cep', this.endereco.cep);
    localStorage.setItem('numero', this.endereco.numero);
    localStorage.setItem('bairro', this.endereco.bairro);
    localStorage.setItem('cidade', this.endereco.cidade);
    localStorage.setItem('estado', this.endereco.estado);
    localStorage.setItem('complemento', this.endereco.complemento);
    */

    this.nav.navigateRoot('conclusao');
  }

  limpaDados() {
    this.labelBotao = 'Cadastrar';
    this.endereco.rua = '';
    this.endereco.numero = '';
    this.endereco.complemento = '';
    this.endereco.bairro = '';
    this.endereco.cep = '';
    this.endereco.cidade = '';
    this.endereco.estado = '';
  }

  //! Não será usada
  /*
  editar() {
    this.labelBbotao = 'Editar';
    this.endereco.rua = localStorage.getItem('rua')!;
    this.endereco.numero = localStorage.getItem('numero')!;
    this.endereco.complemento = localStorage.getItem('complemento')!;
    this.endereco.bairro = localStorage.getItem('bairro')!;
    this.endereco.cep = localStorage.getItem('cep')!;
    this.endereco.cidade = localStorage.getItem('cidade')!;
    this.endereco.estado = localStorage.getItem('estado')!;
  }
*/

  async exibeToast(msg: string, cor: string) {
    const toast = await this.mensagem.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }
}
