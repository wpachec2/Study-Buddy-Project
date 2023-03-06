import { Component, OnInit } from '@angular/core';
import { QandA } from 'src/app/Models/qand-a';
import { QandAService } from 'src/app/Services/qand-a.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  Questions: QandA[] = [];

  constructor(private questionService: QandAService) { }

  ngOnInit(): void {
    this.getQuestions();
  }


  getQuestions():void {
  this.questionService.getQuestions().subscribe((response:QandA[]) => {
      console.log(response);
      this.Questions=response
    });
  }
}
