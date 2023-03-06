import { Component, OnInit } from '@angular/core';
import { QandA } from 'src/app/Models/qand-a';
import { QandAService } from 'src/app/Services/qand-a.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  Favorites: QandA[] = [];

  constructor(private questionService: QandAService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites():void {
    //Swap 1 with UserId
    this.questionService.getFavorite(1).subscribe((response:QandA[]) => {
        console.log(response);
        this.Favorites = response;
      });
    }
}
