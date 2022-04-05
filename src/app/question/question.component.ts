import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  private questions: {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
  }[] = [];

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {}

  onNext() {
    this.router.navigate([`/question/${this.questions.length}`]);
  }

  //function to shuffle questions before start of quiz
  // function randomArrayShuffle(array) {
  //   let currentIndex = array.length, temporaryValue, randomIndex;
  //   while (0 !== currentIndex) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // }
}
