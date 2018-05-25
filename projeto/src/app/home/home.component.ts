import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

import { Material } from '../model/material.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  materiais: Material[];
  descartes: any[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.obterMateriais();
    this.obterRelacaoDeDescartes();
  }

  obterMateriais(): void {
    this.appService.getMateriais()
      .subscribe(
        (material) => {
          this.materiais = material;
          console.log(this.materiais);
        },
        (erro) => console.log(erro.status),
        () => console.log('Busca por materiais concluída')
      );
  }

  obterRelacaoDeDescartes(): void {
    this.appService.getDescartes().
      subscribe(
        (descartes) => {
          this.descartes = descartes;
          console.log(this.descartes);
        },
        (erro) => console.log(erro.status),
        () => console.log('Busca por descartes concluída')
      );
  }

}
