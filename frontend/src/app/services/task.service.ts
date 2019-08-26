import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; 
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private changedTask = new BehaviorSubject({});
  currentTask = this.changedTask.asObservable();

  constructor(private httpClient: HttpClient) { }
  changeTask(task){
    this.changedTask.next(task);
  }
  getTasks(): Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/tasks`);
  }

  getTask(id): Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/tasks/`+id);
  }

  newTask(title): Observable<any>{
    return this.httpClient.post(`${environment.apiURL}/tasks`, {title: title});
  }

  delTask(id): Observable<any>{
    return this.httpClient.delete(`${environment.apiURL}/tasks/`+id);
  }

  updateItem(id, newItem): Observable<any>{
    return this.httpClient.put(`${environment.apiURL}/items/`+id, newItem);
  }

  updateTask(id, newTask): Observable<any>{
    return this.httpClient.put(`${environment.apiURL}/tasks/`+id, newTask);
  }

  createItem(task_id, newItem): Observable<any>{
    return this.httpClient.post(`${environment.apiURL}/items/`+task_id, newItem);
  }

  delItem(id): Observable<any>{
    return this.httpClient.delete(`${environment.apiURL}/items/`+id);
  }
}
