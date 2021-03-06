import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  testSubmitted = new EventEmitter<number>();

  questions = [
    {
      question: 'Which of the following is not a real eCommerce platform?',
      option1: 'Shopify',
      option2: 'WooCommerce',
      option3: 'ShopCommerce',
      option4: 'BigCommerce',
      answer: '3',
    },
    {
      question: 'If Shopify is so good, why are Shopify developers necessary?',
      option1: 'To save time on things like store setups and migrations',
      option2:
        'To extend the limited design options and functionalities of themes with custom code',
      option3:
        'To provide support with a deep understanding of how the platform works and what its limitations are',
      option4: 'All the above',
      answer: '4',
    },
    {
      question: 'Which of the following is true about Shopify developers?',
      option1: 'They are paid extremely well',
      option2: 'There is a high demand for them',
      option3:
        'They need to know web development, the platform itself, and the liquid template language',
      option4: 'All the above',
      answer: '4',
    },
    {
      question: 'Which of the following is true about Wordpress?',
      option1: 'It is another platform like Shopify',
      option2: 'There is a low demand for them',
      option3:
        'They do not need to know web development, the platform itself, and the liquid template language',
      option4: 'All the above',
      answer: '1',
    },
  ];
  addQuestion(
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    answer: string
  ) {
    [...this.questions].push({
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      answer: answer,
    });
  }
  getQuestion(index: number) {
    return this.questions[index];
  }
  //function to shuffle questions before start of quiz
  // randomArrayShuffle(array: []) {
  //   let currentIndex: number = array.length
  //   let temporaryValue: number;
  //   let randomIndex: number;
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
