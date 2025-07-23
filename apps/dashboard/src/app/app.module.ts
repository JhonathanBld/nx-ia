import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { appRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    App
  ],
  bootstrap: [App]
})
export class AppModule { } 