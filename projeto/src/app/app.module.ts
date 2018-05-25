import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { EmpresaComponent } from './form/empresa/empresa.component';
import { RiscoBiologicoComponent } from './form/risco-biologico/risco-biologico.component';
import { MessagesComponent } from './messages/messages.component';
import { DescartesComponent } from './descartes/descartes.component';
import { MateriaisDescartadosComponent } from './materiais-descartados/materiais-descartados.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    EmpresaComponent,
    RiscoBiologicoComponent,
    MessagesComponent,
    DescartesComponent,
    MateriaisDescartadosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
