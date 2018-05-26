import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

import { Empresa } from '../../model/empresa.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  submitted = false;

  empresa = {
    nome_empresa: '',
    cnpj_empresa: '',
    inscricao_municipal: '',
    licensa: ''
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    // this.empresa;
  }

  adicionarEmpresa(empresa: Empresa[]): void {
    let body = this.empresa;
    this.appService.postEmpresa(body)
      .subscribe(
        (empresas) => console.log(empresas),
        (erro) => console.log(erro),
        () => console.log('OK')
      );
  }

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }
}
