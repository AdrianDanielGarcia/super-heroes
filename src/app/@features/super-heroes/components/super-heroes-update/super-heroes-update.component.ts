import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHeroesService } from '@core/services/super-heroes.service';
import { ISuperHeroesTableState } from '@features/super-heroes/facades/super-heroes.facade';
import { ISuperHero } from '@models/super-hero.model';
import { Observable, of, Subject } from 'rxjs';
import { mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'app-super-heroes-update',
  templateUrl: './super-heroes-update.component.html',
  styleUrls: ['./super-heroes-update.component.scss']
})
export class SuperHeroesUpdateComponent implements OnInit, OnDestroy{

  private unsubscribeSignal: Subject<void> = new Subject<void>();

  public superHero: ISuperHero;
  public mode = '';
  public urlParams$ = this.activeRoute.paramMap
    .pipe(
      takeUntil(this.unsubscribeSignal),
      mergeMap( params => {
        this.mode = params.get('mode');

        if (this.mode === 'editar') {
          const id = Number(params.get('id'));
          return this.superHeroesService.getOne(id);
        } else {
          return of({
            id: 0,
            name: '',
            franchise: '',
            authors: ''
          } as ISuperHero)
        }
      })
    );

  public superHeroesForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private superHeroesService: SuperHeroesService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.urlParams$.subscribe(superHero => {
      this.superHero = superHero;
      this.buidForm(superHero)
    })
  }

  private buidForm(supeHero: ISuperHero) {
    this.superHeroesForm = new FormGroup({
      id: new FormControl(supeHero.id),
      name: new FormControl(supeHero.name, Validators.required),
      franchise: new FormControl(supeHero.franchise, Validators.required),
      authors: new FormControl(supeHero.authors, Validators.required),
    });
  }

  public errorHandling(control: string, error: string) {
    return this.superHeroesForm.controls[control].hasError(error);
  }

  public onSubmit() {
    const superHero = this.superHeroesForm.value as ISuperHero;

    if (this.mode === 'editar') {
      this.superHeroesService.update(superHero)
      .subscribe( () => this.router.navigate(['/']));
    } else {
      this.superHeroesService.add(superHero)
      .subscribe( () => this.router.navigate(['/']));
    }
  }

  public cancelEdition(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/']);
  }

  public ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.complete();
  }

}
