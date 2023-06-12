import { Injectable } from '@angular/core';
import { User } from "../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";


@Injectable()

export class UserService {

  private apiUsers: string = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient){ 

  }

    public login (username: string, password:string):Observable <boolean> {
      return this.httpClient.get<User[]>(`${this.apiUsers}?username=${username}`).pipe(map((users: User[]) => {

        if(users[0].password === password)
            return true;

        return false;
    }));
    }


}
