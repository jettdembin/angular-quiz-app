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
  question: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  answersArray = [];
  selectedAnswersArray = [];
  selectedAnwer: string;
  index: number = 0;

  options: any;

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.questions = this.questionService;
    this.question = this.questions.getQuestion(this.index).question;
    this.optionOne = this.questions.getQuestion(this.index).option1;
    this.optionTwo = this.questions.getQuestion(this.index).option2;
    this.optionThree = this.questions.getQuestion(this.index).option3;
    this.optionFour = this.questions.getQuestion(this.index).option4;
    for (let i = 0; i < this.questions.questions.length; i++) {
      this.answersArray[i] = this.questions.getQuestion(i).answer;
    }
  }

  onNext() {
    this.options = document.querySelectorAll(
      `input[name="question${this.index + 1}"]`
    );
    for (const option of this.options) {
      if (option.checked) {
        this.selectedAnwer = option.value;
        this.selectedAnswersArray.push(this.selectedAnwer);
      }
    }
    if (this.index < this.questions.questions.length - 1) {
      this.index++;
      this.question = this.questions.getQuestion(this.index).question;
      this.optionOne = this.questions.getQuestion(this.index).option1;
      this.optionTwo = this.questions.getQuestion(this.index).option2;
      this.optionThree = this.questions.getQuestion(this.index).option3;
      this.optionFour = this.questions.getQuestion(this.index).option4;
    }
  }

  onPrevious() {
    if (this.index) {
      this.index--;
      this.question = this.questions.getQuestion(this.index).question;
      this.optionOne = this.questions.getQuestion(this.index).option1;
      this.optionTwo = this.questions.getQuestion(this.index).option2;
      this.optionThree = this.questions.getQuestion(this.index).option3;
      this.optionFour = this.questions.getQuestion(this.index).option4;
    }
  }
}
