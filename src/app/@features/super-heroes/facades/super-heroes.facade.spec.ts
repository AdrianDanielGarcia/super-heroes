import { TestBed } from '@angular/core/testing';
import { SuperHeroesFacade } from './super-heroes.facade';

describe('CalendarListfacade', () => {
  let facade: SuperHeroesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    facade = TestBed.inject(SuperHeroesFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
