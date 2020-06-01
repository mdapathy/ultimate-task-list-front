import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import * as sha1 from 'js-sha1';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public readonly PASSWORD_HASHING_ITERATIONS_AMOUNT = 5;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    url = environment.apiUrl + 'user/';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            observe: 'response',

        })
    };

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(
            localStorage.getItem('userData') ? jwt_decode(localStorage.getItem('userData')) : undefined);
        this.currentUser = this.currentUserSubject.asObservable();
    }


    private passwordHashing(password: string, iterations?: number) {
        let crypt = sha1(password);
        for (let i = 0; i < iterations; ++i) {
            crypt = sha1(crypt);
        }
        return crypt;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    logIn(email: string, password: string): Observable<User> {

        const userInfo = {
            email,
            password: this.passwordHashing(password, this.PASSWORD_HASHING_ITERATIONS_AMOUNT)
        };

        return this.http.post<User>(this.url + 'log-in', JSON.stringify(userInfo), this.httpOptions).pipe(
            map(data => {
                const tokenJSON: any = data;
                localStorage.setItem('userData', tokenJSON.token);
                const userDecode: User = jwt_decode(tokenJSON.token);
                this.currentUserSubject.next(userDecode);
                return userDecode;
            })
        );

    }

    signUp(email: string, password: string): Observable<User> {
        const userInfo = {
            email,
            password: this.passwordHashing(password, this.PASSWORD_HASHING_ITERATIONS_AMOUNT)
        };
        return this.http.post<User>(this.url + 'sign-up', JSON.stringify(userInfo), this.httpOptions);
    }


    logOut(): void {
        localStorage.removeItem('userData');
        this.currentUserSubject.next(null);
    }


    activate(key: string): Observable<any> {
        return this.http.post<any>(this.url + 'activate', null,
            { headers: this.httpOptions.headers, params: { key } });
    }



}
