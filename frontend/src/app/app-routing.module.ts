import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from "./task/task.component";
import { ItemComponent } from "./item/item.component";
import { TaskResolver } from "./services/task.resolver";


const routes: Routes = [
  {
    path:'task/:id', 
    component: ItemComponent,
    resolve: {
    task: TaskResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
