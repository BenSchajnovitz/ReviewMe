import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Review } from './reviews.model';
import { ReviewsService } from './reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {


  constructor(private reviewService: ReviewsService) { }

  ngOnInit(): void {
  }

}
