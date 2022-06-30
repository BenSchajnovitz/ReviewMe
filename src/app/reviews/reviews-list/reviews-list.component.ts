import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Review } from '../reviews.model';
import { ReviewsService } from '../reviews.service';

interface ReviewListItem extends Review {
  isEdit?: boolean;
}

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit, OnDestroy {

  subscription: Subscription; // Subscription to the reviews list
  reviewList: ReviewListItem[] = [];
  editedReviewIndex: number = -1;

  constructor(private reviewService: ReviewsService) { }

  ngOnInit(): void {
    this.subscription = this.reviewService.getReviews().subscribe({
      next: (reviews) => {
        this.reviewList = reviews;
      }
    })
  }


  editReview(index: number) {

    if(this.editedReviewIndex >= 0)
      this.reviewList[this.editedReviewIndex].isEdit = false;
    
    this.reviewList[index].isEdit = true;
    this.editedReviewIndex = index;
  }

  deleteReview(index: number) {
    this.reviewService.deleteReview(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }





}
