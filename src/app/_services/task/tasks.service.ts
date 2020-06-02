import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/_models/task';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = environment.apiUrl + 'tasks/';
  httpOptions;

  constructor(
    private http: HttpClient,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userData'),
        observe: 'response',

      })
    };
  }

  editTask(task: any): Observable<any> {
    return this.http.put<any>(this.url + 'edit', JSON.stringify(task), { headers: this.httpOptions.headers }).pipe();
  }

  addTask(task: any): Observable<Task> {
    return this.http.post<Task>(this.url + 'create', JSON.stringify(task), { headers: this.httpOptions.headers }).pipe();
  }


  deleteTask(taskId: string): Observable<any> {
    return this.http.post<any>(this.url + taskId + '/delete', null, { headers: this.httpOptions.headers } ).pipe();
  }


  markDoneTask(taskId: string): Observable<any> {
    return this.http.post<any>(this.url + taskId + '/mark-done', null, { headers: this.httpOptions.headers }).pipe();
  }


}
