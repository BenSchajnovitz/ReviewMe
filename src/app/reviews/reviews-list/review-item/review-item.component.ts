import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../reviews.model';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {

  @Input() reviewData: Review;

  constructor() { }

  ngOnInit(): void {
  }
}
