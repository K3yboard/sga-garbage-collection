import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { FormComponent } from 'src/app/form/form.component';
import { DescartesComponent } from './descartes/descartes.component';
import { MateriaisDescartadosComponent } from './materiais-descartados/materiais-descartados.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: FormComponent },
  { path: 'descartes', component: DescartesComponent },
  { path: 'materiais-descartados', component: MateriaisDescartadosComponent }
];
