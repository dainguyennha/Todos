import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { ItemComponent } from './item/item.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import {tasksReducer} from './task.reducers';
import {itemsReducer} from './item/item.reducers';
import { TasksEffects } from "./task.effects";
import {ItemsEffects} from "./item/item.effects"
import { EffectsModule } from "@ngrx/effects";
import { TaskResolver } from "./services/task.resolver";



@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ItemComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreModule.forFeature('tasks', tasksReducer),
    StoreModule.forFeature('items', itemsReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([TasksEffects]),
    EffectsModule.forFeature([ItemsEffects])
  ],
  providers: [
    TaskResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
