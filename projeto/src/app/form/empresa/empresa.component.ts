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
  }

}
