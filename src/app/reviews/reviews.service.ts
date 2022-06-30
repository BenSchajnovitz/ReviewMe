import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, switchMap } from 'rxjs';
import { Review } from './reviews.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private reviewsListData: Review[] = [];
  private reviewsList$ = new BehaviorSubject<Review[]>(this.initiateReviews());

  private imgGen = require('@dudadev/random-img');
  private usersAvatar: {[key: string]: string} = {};

  constructor() { }

  private getAvatarImage(userName: string): Observable<string> {
    return new Observable<string>(
      observer => {
        if(!this.usersAvatar[userName])
        {
          this.imgGen().then((avatarURL:any) => {
            this.usersAvatar[userName] = avatarURL;
            observer.next(avatarURL);
          });
        }
        else
        {
          observer.next(this.usersAvatar[userName]);
        }
      }
    )
  }

  initiateReviews() : Review[] {
    const reviewsJSON = localStorage.getItem("reviewsList");

    if(reviewsJSON)
    {
      this.reviewsListData = JSON.parse(reviewsJSON) as Review[];
      return this.reviewsListData
    }
    return [];
  }

  addReview(review: Review) {
    this.getAvatarImage(review.userName).subscribe({
      next: (avatarImage) => {
        review.avatarImage = avatarImage;
        this.reviewsListData.push(review);
        this.applyChanges();
      }
    })
  }

  getReviews() : Observable<Review[]> {
    return this.reviewsList$.asObservable();
  }

  editReview(index: number, editedReview: Review) {
    this.getAvatarImage(editedReview.userName).subscribe({
      next: (avatarImage) => {
        editedReview.avatarImage = avatarImage;
        this.reviewsListData[index] = editedReview;
        this.applyChanges()
      }
    })

  }

  deleteReview(index: number) {
    this.reviewsListData.splice(index, 1);
    this.applyChanges()
  }

  applyChanges() {   // Updaing list to local storage and emitting all listeners
    const reviewsJSON = JSON.stringify(this.reviewsListData);
    localStorage.setItem("reviewsList", reviewsJSON);
    this.reviewsList$.next(this.reviewsListData);
  }
}
