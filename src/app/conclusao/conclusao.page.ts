import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {
  endereco = {
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
  };
  constructor(public alerta: AlertController, public nav: NavController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.carregaDados();
  }

  async voltar() {
    const voltando = await this.alerta.create({
      header: 'ATENÇÃO',
      message: 'Deseja retornar? Perderá todos os dados!',
      buttons: [
        {
          text: 'Não',
          role: 'Cancel',
        },
        {
          text: 'Retornar',
          handler: () => {
            localStorage.clear();
            this.nav.navigateBack('/');
          },
        },
      ],
    });
    await voltando.present();
  }

  carregaDados() {
    this.endereco.rua = localStorage.getItem('rua')!;
    this.endereco.numero = localStorage.getItem('numero')!;
    this.endereco.complemento = localStorage.getItem('complemento')!;
    this.endereco.bairro = localStorage.getItem('bairro')!;
    this.endereco.cep = localStorage.getItem('cep')!;
    this.endereco.cidade = localStorage.getItem('cidade')!;
    this.endereco.estado = localStorage.getItem('estado')!;
  }
}
