import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { SuperHeroesRoutingModule } from './super-heroes-routing.modules';
import { SuperHeroesFacade } from './facades/super-heroes.facade';
import { SuperHeroesUpdateComponent } from './components/super-heroes-update/super-heroes-update.component';
import { SuperHeroesComponent } from './components/super-heroes/super-heroes.component';

// angular material's module
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SuperHeroesComponent,
    SuperHeroesUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SuperHeroesRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,

  ],
  providers: [
    SuperHeroesFacade,
  ]
})
export class SuperHeroesModule { }
