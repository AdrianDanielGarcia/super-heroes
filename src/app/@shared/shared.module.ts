import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialog } from './components/dialogs/confirmation/confirmation-dialog.component';
import { InputUppercaseDirective } from './directives/input-uppercase.directive';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    ConfirmationDialog,
    InputUppercaseDirective,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    PaginatorComponent,
    InputUppercaseDirective,
    LoaderComponent
  ],
  entryComponents: [
    ConfirmationDialog
  ]
})
export class SharedModule { }
