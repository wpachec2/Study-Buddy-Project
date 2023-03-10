import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
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
      this.Questions = response;
    });
  }

  addFavorite(questionid:number):void {
    //Replace 1 with Userid
    this.questionService.addFavorite(questionid, this.userid).subscribe((response:Favorite) => {
      console.log(response);

    });
  }

  Hide: boolean = false;
  ToggleForm(): void{
    this.Hide = !this.Hide;
  }

  AddQuesiton(newQuestion: QandA){
    this.Questions.push(newQuestion);
    this.questionService.addQuestions(newQuestion.question, newQuestion.answer).subscribe((response: QandA) => {
      console.log(response);
      this.getQuestions();
    });
    this.ToggleForm();
  }

  filter: string = "";
  
  getFiltered(): QandA[]{
    return this.Questions.filter((t: QandA) => t.question.includes(this.filter));
  }

  getCorrectIndex(index: number): number{
    //index is filtered, we need the original
    let qs: QandA = this.getFiltered()[index];

    return this.Questions.findIndex((t: QandA) => t.question == qs.question && t.answer == qs.answer);
  }

  RemoveQuestion(index: number,id :number): void{
    this.Questions.splice(this.getCorrectIndex(index), 1);
    this.questionService.deleteQuestion(id).subscribe((response:QandA)=>{
      console.log(response);
      this.getQuestions();
    
    })
  }

  userid: number = 0;
}
