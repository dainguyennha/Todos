import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { FormBuilder } from "@angular/forms";
import { Router, NavigationEnd } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { AfterViewInit } from "@angular/core";
import { TasksRequested, TaskAdded, TaskDeleted } from "../task.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { Observable } from "rxjs";
import { select } from "@ngrx/store";
import { selectTasks } from "../task.selectors";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  changedTask;

  newTaskForm = this.fb.group({
    newTask: ['']
  })
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new TasksRequested());
    this.store
      .pipe(
        select(selectTasks)
      ).subscribe(tasks => this.tasks = tasks);

    $(document).ready(function() {
      $('.task').on('click', function() {
        $('.task').removeClass("active");
        $(this).addClass("active");
      });
    });
    
    $('.tasks-task').removeClass('grid-on');
    
  }

  checked(isChecked): string{
    if(isChecked == true){
      return "checked"
    }else{
      return ""
    }
  }
  
  addNewTask(){
    this.taskService.newTask(this.newTaskForm.value.newTask).subscribe(res =>{
      if(res['status']){
        this.store.dispatch( new TaskAdded({task: res['data']}) );
      }
      this.newTaskForm.controls['newTask'].setValue('');
    });
  }



  delTask(taskId: number){
    this.taskService.delTask(taskId).subscribe(res =>{
      if(res['status']){
        this.store.dispatch( new TaskDeleted({taskId: taskId}));
        this.router.navigate(['']);
        $('.tasks-task').removeClass('grid-on');
        $('.task-wrap').removeClass('display-none');
        $('.task-wrap').addClass('display-none');
      }
    });
  }
}
