import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LnButtonModule } from '@lernender/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LnButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
