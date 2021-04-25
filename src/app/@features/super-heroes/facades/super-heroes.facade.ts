import { Injectable } from '@angular/core';
import { StateService } from '@core/classes/state.service';
import { SuperHeroesService } from '@core/services/super-heroes.service';
import { ISuperHero } from '@models/super-hero.model';
import { distinctUntilDeepChanged } from '@utils/rxjs-operators/distinct-until-deep-changed';
import { map, mergeMap, tap } from 'rxjs/operators';


export interface ISuperHeroesTableState {
  filter: string;
  totalCount: number;
  pageNumber: number;
  pageLength: number;
  selectedHero: ISuperHero;
}

const initialState: ISuperHeroesTableState = {
  filter: '',
  totalCount: 0,
  pageNumber: 1,
  pageLength: 5,
  selectedHero: null
};

@Injectable()
export class SuperHeroesFacade extends StateService<ISuperHeroesTableState> {

  // private streams - declarative part
  private stateChanges$ = this.select( () => ({
    filter: this.state.filter,
    pageNumber: this.state.pageNumber,
    pageLength: this.state.pageLength,
  })).pipe(
    distinctUntilDeepChanged()
  );

  // --------------------------------------------------------------------------------------
  // public streams - declarative part
  public superHeroesList$ = this.stateChanges$
  .pipe(
    tap( data => console.log(data)),
    mergeMap(state =>
      this.superHeroesService.getList(
        state.filter,
        state.pageNumber,
        state.pageLength
      )
    ),
    tap(responseData =>
      this.updateStateWithTotalCountWithoutPropagate(responseData.totalCount)
    ),
    map(responseData => responseData.response)
  );

  public pageNumber$ = this.select( () => this.state.pageNumber);
  public selectedHero$ = this.select( () => this.state.selectedHero);

  // ----------------------------------------------------------------------------------------
  constructor(
    private superHeroesService: SuperHeroesService,
  ) {
    super(initialState)
  }

  public nextPage() {
    const newState = this.getStateSnapshot();
    const lastPage = this.calculateLastPageNumber(newState);
    if ((this.state.pageNumber + 1) <= lastPage) {
      newState.pageNumber += 1;
      newState.selectedHero = null;
      this.setState(newState);
    }
  }

  public previousPage() {
    const newState = this.getStateSnapshot();
    if ((this.state.pageNumber - 1) * newState.pageLength > 0) {
      newState.pageNumber -= 1;
      newState.selectedHero = null;
      this.setState(newState);
    }
  }

  public firstPage() {
    const newState = this.getStateSnapshot();
    newState.pageNumber = 1;
    newState.selectedHero = null;
    this.setState(newState);
  }

  public lastPage() {
    const newState = this.getStateSnapshot();
    newState.pageNumber = this.calculateLastPageNumber(newState);
    newState.selectedHero = null;
    this.setState(newState);
  }

  public filter(filter: string) {
    this.setState({ filter, pageNumber: 1 });
  }

  public selectedHero(selectedHero: ISuperHero) {
      this.setState({selectedHero});
  }

  public deleteHero(hero: ISuperHero) {
    this.superHeroesService.delete(hero)
    .subscribe( () =>
      this.setState({
        ...this.getStateSnapshot(),
        selectedHero: null
      })
    );
  }

  private calculateLastPageNumber(state: ISuperHeroesTableState) {
    return Math.trunc((state.totalCount - 0.2)/ state.pageLength) + 1;
  }

  private updateStateWithTotalCountWithoutPropagate(totalCount: number) {
    this.setState({ totalCount } , false);
  }
}
