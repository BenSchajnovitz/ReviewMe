import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsListComponent } from './reviews/reviews-list/reviews-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewItemComponent } from './reviews/reviews-list/review-item/review-item.component';
import { ReviewFormComponent } from './reviews/review-form/review-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent,
    ReviewsListComponent,
    ReviewItemComponent,
    ReviewFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
