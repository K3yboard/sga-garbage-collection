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

  private empresaUrl = 'http://localhost:3000/api/empresa';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  public getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.empresaUrl);
  }

  private log(message: string) {
    this.messageService.add('AppService: ' + message);
  }
}
