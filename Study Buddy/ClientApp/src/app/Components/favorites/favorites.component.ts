import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { QandA } from 'src/app/Models/qand-a';
import { QandAService } from 'src/app/Services/qand-a.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  Favorites: QandA[] = [];
  FavQ : Favorite[] = [];


  constructor(private questionService: QandAService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites():void {
    //Swap 1 with UserId
    this.questionService.getFavorite(this.userid).subscribe((response:QandA[]) => {
        console.log(response);
        this.Favorites = response;
    });
  }

  filter: string = "";
  
  getFiltered(): QandA[]{
    return this.Favorites.filter((t: QandA) => t.question.includes(this.filter));
  }

  getCorrectIndex(index: number): number{
    //index is filtered, we need the original
    let qs: QandA = this.getFiltered()[index];

    return this.Favorites.findIndex((t: QandA) => t.question == qs.question && t.answer == qs.answer);
  }

  RemoveQuestion(index: number): void{
    this.Favorites.splice(this.getCorrectIndex(index), 1);
  }

  deleteFavorite(questionid:number):void{
    this.questionService.deleteFavorite(questionid,this.userid).subscribe((response:Favorite)=>{
      console.log(response);
      this.getFavorites()
    })
  }

  userid: number = 0;
}
