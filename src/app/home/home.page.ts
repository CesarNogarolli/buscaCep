import { Component } from '@angular/core';
import { MeuCepService } from '../services/meu-cep.service';
import { AlertController, NavController } from '@ionic/angular';
import { publicDecrypt } from 'crypto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public mensagem: AlertController,
    public nav: NavController,
    private cep: MeuCepService
  ) {}

  buscaCEP(evento) {
    const cepDigitado = evento.detail.value;
  }
}
