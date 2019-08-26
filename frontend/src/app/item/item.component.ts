import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Params } from "@angular/router";
import { TaskService } from "../services/task.service";
import { FormBuilder, FormArray } from "@angular/forms";
import * as $ from 'jquery';
import { Task } from "../models/task.model";
import { Item } from "../models/item.model";
import { TaskComponent } from "../task/task.component";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [TaskComponent]
})
export class ItemComponent implements OnInit {

  @Output() delTaskEvent = new EventEmitter<number>();
  task_id = -1;
  task;
  items;

  taskForm = this.fb.group({
    title: [''],
    description: [''],
    itemForm: this.fb.array([]),
    newItemForm:[''] 
  })
  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private taskComponent: TaskComponent
  ) {}

  ngOnInit() {
    this.taskService.currentTask.subscribe();
    this.activatedRoute.params.subscribe(params => {
      $('.tasks-task').addClass('grid-on');
      $('.task-wrap').removeClass('display-none');
      
      this.task_id = params.id
      this.itemForm.controls = [];
      this.taskService.getTask(params.id).subscribe(task => {

        this.task = task.task;
        this.items = task.items;

        this.taskForm.controls['description'].setValue(task.task.description);
        this.taskForm.controls['title'].setValue(task.task.title);

        task.items.forEach(item => {
          this.itemForm.push(this.fb.group({
            id: [item.id],
            isChecked: [item.checked],
            description: [item.description]
          }))
        })
      });
    });
  }

  updateValue(){
    if (this.checkChangeTask()){
      var task = new Task(this.task.id, this.taskForm.value.title, this.taskForm.value.description, true); 
      this.taskService.updateTask(this.task.id, task).subscribe(res => {
        this.taskForm.controls['description'].setValue(res.description);
        this.taskForm.controls['title'].setValue(res.title);
        this.taskService.changeTask(res);
      });
    }

    var tempChangeItem = this.checkChangeItem();

    if (tempChangeItem != -1){
      var newItem = this.taskForm.value.itemForm[tempChangeItem];
      var item = new Item(newItem.description, newItem.isChecked);
      this.taskService.updateItem(newItem.id, item).subscribe(res =>{
        this.items[tempChangeItem].description = res.description;
        this.items[tempChangeItem].checked = res.checked;
        this.taskService.changeTask(res);
      })
    }

    if (this.checkChangeNewItem()){
      this.taskService.createItem(this.task.id, {description: this.taskForm.value.newItemForm}).subscribe(res => {
         this.itemForm.push(this.fb.group({
            id: [res.id],
            isChecked: [res.checked],
            description: [res.description]
          }))
          this.items.push(res);
          this.taskForm.controls['newItemForm'].setValue("");
          this.taskService.changeTask(res);
      })
    }
  }

  checkChangeTask(): boolean{
    return this.taskForm.value.title != this.task.title || this.taskForm.value.description != this.task.description;
  }

  checkChangeItem(): number{
    var temp = -1;
    this.items.forEach((item, index) => {
      if(item.checked != this.taskForm.value.itemForm[index].isChecked || item.description != this.taskForm.value.itemForm[index].description){
        temp = index;
      }
    })
    return temp;
  }

  checkChangeNewItem(): boolean{
    return this.taskForm.value.newItemForm.length != 0;
  }

  onSelected(item){
  }

  delItem(id){
    var delItemId = this.items[id].id
    this.taskService.delItem(delItemId).subscribe(res =>{
      this.items.splice(id, 1);
      this.itemForm.removeAt(id);
      this.taskService.changeTask(res);
    })
  }

  delTask(){
    if(this.task_id != -1){
      this.taskService.delTask(this.task_id).subscribe(res =>{
        this.router.navigate(['']);      
      });
    }
  }

  get itemForm(){
    return this.taskForm.get('itemForm') as FormArray;
  }

  send(x){
    this.delTaskEvent.emit(x);
    console.log(x);
  }
}
