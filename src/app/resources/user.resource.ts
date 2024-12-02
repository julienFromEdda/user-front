import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserRequest } from "../models/user-request.model";
import { UserResult } from "../models/user-result.model";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserResource {
    private readonly apiUrl: string = 'http://localhost:5067/users/';
    private readonly http = inject(HttpClient);
    
    public search(request: UserRequest) : Observable<UserResult> {
        return this.http.post<UserResult>(`${this.apiUrl}search`, request);
    }
}