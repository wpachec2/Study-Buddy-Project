import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from '../Models/favorite';
import { QandA } from '../Models/qand-a';

@Injectable({
  providedIn: 'root'
})
export class QandAService {

  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }

  getQuestions():Observable<QandA[]>{
    return this.http.get<QandA[]>(`${this.baseUrl}api/Question/getQuestions`);
  }

  addQuestions(question: string, answer: string):Observable<QandA>{
    return this.http.post<QandA>(`${this.baseUrl}api/Question/addQuestion?question=${question}&answer=${answer}`, {});
  }

  addFavorite(id: number, userid: number):Observable<Favorite>{
    return this.http.post<Favorite>(`${this.baseUrl}api/Question/addFavorite?Questionid=${id}&Userid=${userid}`, {});
  }

  getFavorite(userid: number):Observable<QandA[]>{
    return this.http.get<QandA[]>(`${this.baseUrl}api/Question/getFavorites?userId=${userid}`);
  }
}

// castVote(id:number):Observable<Vote>{
//   return this.http.put<Vote>(`${this.baseUrl}api/Vote/addVote?Id=${id}`, {});
// }