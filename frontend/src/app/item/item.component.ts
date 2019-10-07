import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Params } from "@angular/router";
import { TaskService } from "../services/task.service";
import { FormBuilder, FormArray } from "@angular/forms";
import * as $ from 'jquery';
import { Task } from "../models/task.model";
import { Item } from "../models/item.model";
import { TaskComponent } from "../task/task.component";
import { TaskEdited } from "../task.actions";
import {ItemEditted} from "./item.actions";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { selectItemsPage } from "./item.selectors";
import { ItemsRequested, ItemDeleted, ItemAdded } from "./item.actions";
import { tap } from "rxjs/internal/operators";
import { selectTaskPage } from "../task.selectors";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [TaskComponent]
})
export class ItemComponent implements OnInit, OnDestroy {

  task_id = -1;
  task: Task;
  items: Item[];
  private sub: any;

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
    private taskComponent: TaskComponent,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.task = this.activatedRoute.snapshot.data['task'];
    this.sub = this.activatedRoute.params.subscribe(params => {
    this.store.pipe(
      select(selectItemsPage(params.id)),
      tap(items => {
        this.items = items;
        this.itemForm.controls = [];
        console.log(items);
        if(items.length > 0){
          items.forEach(item => {
            this.itemForm.push(this.fb.group({
              id: [item.id],
              isChecked: [item.checked],
              description: [item.description]
            }))
          })
        }else{
          this.store.dispatch(new ItemsRequested({taskId: params.id}))
        }

      })
    ).subscribe();
      this.store.pipe(
        select(selectTaskPage(params.id)),
        tap(
          task => {
            this.task = task;
            this.taskForm.controls['description'].setValue(task.description);
            this.taskForm.controls['title'].setValue(task.title);
          }
        )
      ).subscribe();
      $('.tasks-task').addClass('grid-on');
      $('.task-wrap').removeClass('display-none');
      
      this.task_id = params.id
      
 //   this.taskService.getTask(params.id).subscribe(task => {

 //     this.task = task.task;

 //     this.taskForm.controls['description'].setValue(task.task.description);
 //     this.taskForm.controls['title'].setValue(task.task.title);

 // 
 //     task.items.forEach(item => {
 //       this.itemForm.push(this.fb.group({
 //         id: [item.id],
 //         isChecked: [item.checked],
 //         description: [item.description]
 //       }))
 //     })
 //   });
    });
  }

  updateValue(){
    if (this.checkChangeTask()){
      var newTask = new Task(this.task.id, this.taskForm.value.title, this.taskForm.value.description, true, this.task.total_item, this.task.checked_item); 
      this.taskService.updateTask(this.task.id, newTask).subscribe(res => {
        this.taskForm.controls['description'].setValue(res.description);
        this.taskForm.controls['title'].setValue(res.title);
        const task: Update<Task> ={
          id: this.task_id,
          changes: res
        };

        this.store.dispatch(new TaskEdited({task}));
      });
    }

    var tempChangeItem = this.checkChangeItem();

    if (tempChangeItem != -1){
      var newItem = this.taskForm.value.itemForm[tempChangeItem];
      console.log(newItem);
      var item = new Item(newItem.id, newItem.description, newItem.isChecked, this.task_id);
      console.log(item);
      this.taskService.updateItem(newItem.id, item).subscribe(res =>{
        
        const taskItem: Update<Task> ={
          id: this.task_id,
          changes: res['task']
        };

        this.store.dispatch(new TaskEdited({task: taskItem}));

        const item: Update<Item> ={
          id: res['item'].id,
          changes: res['item']
        };

        this.store.dispatch(new ItemEditted({item: item}));

      })
    }

    if (this.checkChangeNewItem()){
      this.taskService.createItem(this.task.id, {description: this.taskForm.value.newItemForm}).subscribe(res => {
         this.itemForm.push(this.fb.group({
            id: [res['item'].id],
            isChecked: [res['item'].checked],
            description: [res['item'].description]
          }))
      //  this.items.push(res);
          this.store.dispatch(new ItemAdded({item: res['item']}));
          const taskNewItem: Update<Task> ={
            id: this.task_id,
            changes: res['task']
          };

          this.store.dispatch(new TaskEdited({task: taskNewItem}));
          
          this.taskForm.controls['newItemForm'].setValue("");
      })
    }
  }

  checkChangeTask(): boolean{
    return this.taskForm.value.title != this.task.title || this.taskForm.value.description != this.task.description;
  }

  checkChangeItem(): number{
    var temp = -1;
    this.store.pipe(
      select(selectItemsPage(this.task_id)),
      tap(items => {
        items.forEach((item, index) => {
      if(item.checked != this.taskForm.value.itemForm[index].isChecked || item.description != this.taskForm.value.itemForm[index].description){
        temp = index;
      }
    })
      })
    ).subscribe();
//  this.items.forEach((item, index) => {
//    if(item.checked != this.taskForm.value.itemForm[index].isChecked || item.description != this.taskForm.value.itemForm[index].description){
//      temp = index;
//    }
//  })
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
      this.store.dispatch(new ItemDeleted({itemId: delItemId}));
      const taskItemDel: Update<Task> ={
        id: this.task_id,
        changes: res['task']
      };

      this.store.dispatch(new TaskEdited({task: taskItemDel}));
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

  ngOnDestroy(){
  }
}

