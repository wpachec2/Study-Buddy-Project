import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QandA } from '../Models/qand-a';

@Injectable({
  providedIn: 'root'
})
export class QandAService {

  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }

  getQuestions():Observable<QandA[]>{
    return this.http.get<QandA[]>(`${this.baseUrl}api/Question/getQuestions`);
  }

  addFavorite(id: number, userid: number):Observable<QandA>{
    return this.http.post<QandA>(`${this.baseUrl}api/Question/addFavorite?Favoriteid=${id}&Userid=${userid}`, {});
  }
}

// castVote(id:number):Observable<Vote>{
//   return this.http.put<Vote>(`${this.baseUrl}api/Vote/addVote?Id=${id}`, {});
// }