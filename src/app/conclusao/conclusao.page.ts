import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { EnderecosService } from '../services/enderecos.service';

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

  public enderecos: any[] = [];

  constructor(
    public alerta: AlertController,
    public nav: NavController,
    public servicos: EnderecosService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.carregaDados();
  }

  async voltar() {
    const voltando = await this.alerta.create({
      header: 'ATENÇÃO',
      message: 'Nenhum endereço encontrado, cadastre um novo!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.nav.navigateBack('home');
          },
        },
      ],
    });
    await voltando.present();
  }

  novo() {
    this.nav.navigateRoot('/');
  }

  carregaDados() {
    if (this.servicos.listar()) {
      this.enderecos = this.servicos.listar()!;

      if (this.enderecos.length == 0) {
        this.voltar();
      }
    }
  }

  deletar(cep: string) {
    this.servicos.deletar(cep);
    this.carregaDados();
  }
}
