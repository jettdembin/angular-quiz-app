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
  index = 0;
  checked = false;
  score = 0;
  highestQuestionNumber = 1;

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

  checkAnswer() {
    if (this.checked) {
      this.options = document.querySelectorAll(
        `input[name="question${this.index + 1}"]`
      );
      for (const option of this.options) {
        if (option.checked) {
          this.selectedAnwer = option.value;
          this.selectedAnswersArray[this.index]
            ? this.selectedAnswersArray.splice(
                this.index,
                1,
                this.selectedAnwer
              )
            : this.selectedAnswersArray.push(this.selectedAnwer);
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
    } else {
      alert('Please select an answer before proceeding');
    }
  }

  onNext() {
    document.querySelector(`input[name="question${this.index + 1}"]:checked`)
      ? (this.checked = true)
      : (this.checked = false);
    this.checkAnswer();
    this.checked = false;
    if (this.index <= this.highestQuestionNumber) {
      this.handleClearOfInputs();
    }
    this.highestQuestionNumber++;
    this.checkIfPreviouslyAnswered();
  }

  onSubmit() {
    document.querySelector(`input[name="question${this.index + 1}"]:checked`)
      ? (this.checked = true)
      : (this.checked = false);
    this.checkAnswer();
    if (this.selectedAnswersArray.length === this.questions.questions.length) {
      for (let i = 0; i < this.questions.questions.length; i++) {
        if (this.selectedAnswersArray[i] === this.answersArray[i]) {
          this.score++;
        }
      }
    }
    console.log(this.score);
    this.questionService.testSubmitted.emit(this.score);
  }

  onPrevious() {
    this.highestQuestionNumber--;
    if (this.index) {
      this.index--;
      this.checkIfPreviouslyAnswered();
      this.question = this.questions.getQuestion(this.index).question;
      this.optionOne = this.questions.getQuestion(this.index).option1;
      this.optionTwo = this.questions.getQuestion(this.index).option2;
      this.optionThree = this.questions.getQuestion(this.index).option3;
      this.optionFour = this.questions.getQuestion(this.index).option4;
    }
  }

  checkIfPreviouslyAnswered() {
    if (this.selectedAnswersArray[this.index]) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].value === this.selectedAnswersArray[this.index]) {
          this.options[i].checked = true;
        }
      }
    }
  }

  handleClearOfInputs() {
    this.options.forEach((element: any) => {
      element.checked = false;
    });
  }
}
