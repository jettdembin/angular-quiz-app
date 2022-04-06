import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [QuestionService],
})
export class QuestionComponent implements OnInit {
  questions: QuestionService;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  answer: string;
  index: number = 0;
  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.questions = this.questionService;
    this.optionOne = this.questions.getNextQuestion(this.index).option1;
    this.optionTwo = this.questions.getNextQuestion(this.index).option2;
    this.optionThree = this.questions.getNextQuestion(this.index).option3;
    this.optionFour = this.questions.getNextQuestion(this.index).option4;
  }

  onNext() {}
}
