import { Component } from '@angular/core';
import { MeuCepService } from '../services/meu-cep.service';
import { NavController, ToastController } from '@ionic/angular';

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

  constructor(
    public mensagem: ToastController,
    public nav: NavController,
    private cep: MeuCepService
  ) {}

  buscaCEP(evento: any) {
    const cepDigitado = evento.detail.value;
    console.log('Obtendo os dados para o cep: ' + cepDigitado);

    if (cepDigitado.length == 8) {
      this.cep
        .localizacep(cepDigitado)
        .then((resp) => {
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
        })
        .catch(() => {
          this.exibeToast('CEP não encontrado!', 'warning');
        });
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
      this.nav.navigateForward('conclusao');
    }
  }

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
