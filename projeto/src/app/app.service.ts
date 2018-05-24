import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Empresa } from './model/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private empresaUrl = '/api/empresa';
  private header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  public getEmpresas(): Observable<Empresa[]> {
    const httpOptions = new HttpHeaders(this.header);
    // this.messageService.add('AppService: obtendo empresas');

    return this.http.get<Empresa[]>(this.empresaUrl, { headers: httpOptions });
  }

  private log(message: string) {
    this.messageService.add('AppService: ' + message);
  }
}
