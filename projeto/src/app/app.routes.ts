import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { DescartesComponent } from './descartes/descartes.component';
import { MateriaisDescartadosComponent } from './materiais-descartados/materiais-descartados.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { FormComponent } from './form/form.component';
import { EmpresaFormComponent } from './form/empresa-form/empresa-form.component';
import { MaterialFormComponent } from './form/material-form/material-form.component';
import { RiscoBiologicoFormComponent } from './form/risco-biologico-form/risco-biologico-form.component';

export const ROUTES: Routes = [
  { path: '', component: MateriaisDescartadosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'descartes', component: DescartesComponent },
  { path: 'materiais-descartados', component: MateriaisDescartadosComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'cadastro', component: FormComponent,
    children: [
      { path: 'empresa', component: EmpresaFormComponent },
      { path: 'material', component: MaterialFormComponent },
      { path: 'risco-biologico', component: RiscoBiologicoFormComponent }
    ]
  }
];
