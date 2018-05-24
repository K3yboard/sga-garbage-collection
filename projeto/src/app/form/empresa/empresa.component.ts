import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../model/empresa.model';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public empresas: Empresa[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.buscarEmpresas();
  }

  buscarEmpresas(): void {
    this.appService.getEmpresas()
      .subscribe(
        (empresa) => {
          this.empresas = empresa;
          console.log(this.empresas);
        },
        (erro: any) => console.log('Erro para buscar propostas', erro.status),
        () => console.log('Busca completa')
      );
  }

}
