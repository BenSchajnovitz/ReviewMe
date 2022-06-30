import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Review } from '../reviews.model';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  reviewForm = this.formBuilder.group({
    name: ['', Validators.required],
    comment: ['']
  });

  @Input() reviewToEdit: Review;
  @Input() reviewIndex: number = -1;

  isEditMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private reviewService: ReviewsService) { }

  ngOnInit(): void {
    if(this.reviewToEdit && this.reviewIndex >= 0)
    {
      this.reviewForm.controls['name'].setValue(this.reviewToEdit.userName);
      this.reviewForm.controls['comment'].setValue(this.reviewToEdit.comment);
      this.isEditMode = true;
    }
      
  }


  modifyReview() {
    if(this.reviewForm.invalid)
      return;

    const review: Review = {
      userName: this.reviewForm.value.name,
      comment: this.reviewForm.value.comment
    }

    if(this.isEditMode)
      this.reviewService.editReview(this.reviewIndex, review);
    else
      this.reviewService.addReview(review);

    this.reviewForm.reset();
  }

}
