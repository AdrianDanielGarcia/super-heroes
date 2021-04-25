
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged,takeUntil } from 'rxjs/operators';

import { ConfirmationDialog } from '@shared/components/dialogs/confirmation/confirmation-dialog.component';
import { PaginatorEvents } from '@shared/components/paginator/paginator.component';
import { ISuperHero } from '@models/super-hero.model';
import { SuperHeroesFacade } from '@features/super-heroes/facades/super-heroes.facade';

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrls: ['./super-heroes.component.scss']
})
export class SuperHeroesComponent implements OnInit, OnDestroy {

  public list$ = this.superHeroesFacade.superHeroesList$;
  public pageNumber$ = this.superHeroesFacade.pageNumber$;
  public selectedHero$ =  this.superHeroesFacade.selectedHero$;

  public displayedColumns = ['id', 'name', 'franchise', 'authors'];
  public pageNumber = 1;

  private unsubscribeSignal: Subject<void> = new Subject<void>();

  public superHeroesForm = new FormGroup({
    filter: new FormControl(''),
  });

  constructor(
    private superHeroesFacade: SuperHeroesFacade,
    private dialog: MatDialog,
    private router: Router
  ) {}

  public ngOnInit(): void {

    this.superHeroesFacade.selectedHero(null);
    this.getFilterChangesAndPropageIt();

  }

  public pageChanged(event: PaginatorEvents) {
    switch(event) {
      case PaginatorEvents.first:
        this.superHeroesFacade.firstPage();
        break;
      case PaginatorEvents.previous:
        this.superHeroesFacade.previousPage();
        break;
      case PaginatorEvents.next:
        this.superHeroesFacade.nextPage();
        break;
      case PaginatorEvents.last:
        this.superHeroesFacade.lastPage();
        break;
    }
  }

  public updateSelectedHero(selectedHero: ISuperHero) {
    this.superHeroesFacade.selectedHero(selectedHero);
  }

  public openDeleteConfirmationDialog(selectedHero: ISuperHero) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
      data: `¿Está seguro que desea borrar a ${selectedHero.name}?`,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(confirmation => {
     if (confirmation) {
      this.superHeroesFacade.deleteHero(selectedHero);
     }
    });
  }

  public updateOrAddHero(hero: ISuperHero) {
    if (!hero) {
      this.router.navigate(['añadir']);
    } else {
      this.router.navigate(['editar', hero.id]);
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.complete();
  }

  private getFilterChangesAndPropageIt() {
    this.superHeroesForm.valueChanges
    .pipe(
      takeUntil(this.unsubscribeSignal),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(
      form =>  this.superHeroesFacade.filter(form.filter)
    );
  }

}
