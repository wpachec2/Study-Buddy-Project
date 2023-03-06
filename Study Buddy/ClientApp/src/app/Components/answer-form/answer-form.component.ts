import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QandA } from 'src/app/Models/qand-a';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit {
  newQuestion: QandA = {} as QandA;
  constructor() { }

  @Output() QuestionCreated = new EventEmitter<QandA>();

  ngOnInit(): void {
  }

  CreatePost(): void{
    let result: QandA = {
      questionid: this.newQuestion.questionid,
      question: this.newQuestion.question,
      answer: this.newQuestion.answer
    };

    this.QuestionCreated.emit(result);
  }

}
