import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AbaListaComponent } from 'src/components/aba_lista/aba_lista.component';
import { CardComponent } from 'src/components/card/card.component';
import { CardrowComponent } from 'src/components/cardrow/cardrow.component';
import { CardsComponent } from 'src/components/cards/cards.component';
import { CardService } from 'src/services/cards.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardComponent,
    AbaListaComponent,
    CardrowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }