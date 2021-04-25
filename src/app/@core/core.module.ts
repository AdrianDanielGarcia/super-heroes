import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroesMockProvider } from './interceptors/super-heroes-mock.interceptor';
import { SuperHeroesMockArray } from '@app/@mocks/super-heroes.mock';
import { LoaderInterceptor, LoaderProvider } from './interceptors/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoaderProvider,
    SuperHeroesMockProvider,
    SuperHeroesMockArray,
    LoaderInterceptor,
    LoaderService,
  ]
})
export class CoreModule { }
