import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { FormComponent } from 'src/app/form/form.component';
import { EmpresaComponent } from 'src/app/form/empresa/empresa.component';
import { RiscoBiologicoComponent } from 'src/app/form/risco-biologico/risco-biologico.component';
import { DescartesComponent } from './descartes/descartes.component';
import { MateriaisDescartadosComponent } from './materiais-descartados/materiais-descartados.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: FormComponent,
    children: [
      { path: '', component: EmpresaComponent },
      { path: 'empresa', component: EmpresaComponent },
      { path: 'risco-biologico', component: RiscoBiologicoComponent }
    ]
  },
  { path: 'descartes', component: DescartesComponent },
  { path: 'materiais-descartados', component: MateriaisDescartadosComponent }
];
