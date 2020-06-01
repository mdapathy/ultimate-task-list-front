import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/app/_models/project';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = environment.apiUrl + 'project/';
  httpOptions;
  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userData'),
        observe: 'response',

      })
    };
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url, { headers: this.httpOptions.headers }).pipe();
  }

}
