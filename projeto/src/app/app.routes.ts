import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { DescartesComponent } from './descartes/descartes.component';
import { MateriaisDescartadosComponent } from './materiais-descartados/materiais-descartados.component';
import { EmpresasComponent } from './empresas/empresas.component';

export const ROUTES: Routes = [
  { path: '', component: MateriaisDescartadosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'descartes', component: DescartesComponent },
  { path: 'materiais-descartados', component: MateriaisDescartadosComponent },
  { path: 'empresas', component: EmpresasComponent }
];
