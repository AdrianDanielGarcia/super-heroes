import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroesUpdateComponent } from './components/super-heroes-update/super-heroes-update.component'
import { SuperHeroesComponent } from './components/super-heroes/super-heroes.component';


const routes: Routes = [
  {
    path: ':mode', component: SuperHeroesUpdateComponent,
  },
  {
    path: ':mode/:id', component: SuperHeroesUpdateComponent,
  },
  {
    path: '', component: SuperHeroesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperHeroesRoutingModule { }
