import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/app/_models/project';
import { AuthenticationService } from '../authentication/authentication.service';
import { Task } from 'src/app/_models/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = environment.apiUrl + 'project/';
  httpOptions;
  constructor(
    private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userData'),
        observe: 'response',

      })
    };
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + 'get-all', { headers: this.httpOptions.headers }).pipe();
  }


  getFavProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + 'get-favourite', { headers: this.httpOptions.headers }).pipe();
  }

  addProject(project: Project): Observable<any> {
    return this.http.post<any>(this.url + 'add', JSON.stringify(project), { headers: this.httpOptions.headers }).pipe();
  }


  editProject(project: Project): Observable<any> {
    return this.http.put<any>(this.url + 'edit', JSON.stringify(project), { headers: this.httpOptions.headers }).pipe();
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete<any>(this.url + projectId, { headers: this.httpOptions.headers }).pipe();
  }

  getTasksByProjectId(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + projectId + '/tasks/uncompleted', { headers: this.httpOptions.headers }).pipe();
  }
}
