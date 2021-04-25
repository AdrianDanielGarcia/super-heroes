import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public loading = false;

  constructor(
    private loaderService: LoaderService
  ) {
    this.loaderService.isLoading$.subscribe(loading => this.loading = loading)
  }

  ngOnInit(): void {
  }

}
