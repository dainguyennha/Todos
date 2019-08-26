import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { FormBuilder } from "@angular/forms";
import { Router, NavigationEnd } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { AfterViewInit } from "@angular/core";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit {
  tasks;
  changedTask;

  newTaskForm = this.fb.group({
    newTask: ['']
  })
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    $(document).ready(function() {
      $('.task').on('click', function() {
        $('.task').removeClass("active");
        $(this).addClass("active");
      });
    });
    
    $('.tasks-task').removeClass('grid-on');
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
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
        this.tasks.push(res['data']);
      }
      this.newTaskForm.controls['newTask'].setValue('');
    });
  }

  ngAfterViewInit(){
    this.taskService.currentTask.subscribe(res =>{
      this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      })
    })
  }

  delTask(taskId){
    this.taskService.delTask(this.tasks[taskId].id).subscribe(res =>{
      this.tasks.splice(taskId, 1);
      this.router.navigate(['']);
      $('.tasks-task').removeClass('grid-on');
      $('.task-wrap').removeClass('display-none');
      $('.task-wrap').addClass('display-none');
    });
  }
}
