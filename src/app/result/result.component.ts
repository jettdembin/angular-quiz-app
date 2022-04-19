import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question/question.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  questions: QuestionService;
  score = 0;

  constructor(private questionService: QuestionService) {
    this.questionService.testSubmitted.subscribe((score: number) =>
      alert(`Your score is ${score}`)
    );
  }

  ngOnInit() {
    this.questions = this.questionService;
  }
}
