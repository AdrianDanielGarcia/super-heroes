import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export enum PaginatorEvents {
  first,
  previous,
  next,
  last

}
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {


  @Input() pageNumber = 1;
  @Output() paginatorChanged = new EventEmitter<PaginatorEvents>();

  public paginatorEvents = PaginatorEvents;

  constructor() { }

  public raiseEvent(event: PaginatorEvents) {
    this.paginatorChanged.emit(event);
  }

}
