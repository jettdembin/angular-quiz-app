import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [QuestionService],
})
export class QuestionComponent implements OnInit {
  @ViewChild('inputAnswer') inputAnswer; // accessing the reference element

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
    this.handleClear();
  }

  onSubmit() {
    document.querySelector(`input[name="question${this.index + 1}"]:checked`)
      ? (this.checked = true)
      : (this.checked = false);
    this.checkAnswer();
    if (this.selectedAnswersArray.length === this.questions.questions.length) {
      // this.router.navigate(['/result']);
      for (let i = 0; i < this.questions.questions.length; i++) {
        if (this.selectedAnswersArray[i] === this.answersArray[i]) {
          this.score++;
        }
      }
    }
    console.log(this.selectedAnswersArray, this.score);
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

  handleClear() {
    //clear inputs before proceeding
    this.inputAnswer.nativeElement.checked = false;
  }
}
