import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {

  private isLoading = new BehaviorSubject(false);
  public isLoading$ = this.isLoading.asObservable();

  constructor() { }

  public beginLoading() {
    this.isLoading.next(true);
  }

  public endLoading() {
    this.isLoading.next(false);
  }
}
