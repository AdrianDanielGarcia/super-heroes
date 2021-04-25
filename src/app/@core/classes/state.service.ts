// thanks to https://dev.to/angular/simple-yet-powerful-state-management-in-angular-with-rxjs-4f8g
// implementation of a simple reactive state managment
// with select capabilities
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

export class StateService<T> {

  private state$: BehaviorSubject<T>;
  private propagateChanges = true;

  protected get state(): T {
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  // this function let me create 'select' like ngrx functions
  // and get a slice of the state
  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      filter( () => this.propagateChanges),
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>, propagateChanges = true): void {
    this.propagateChanges = propagateChanges;
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }

  // in case that you need the state value in non reactive way
  public getStateSnapshot() {
    return this.state;
  }
}
