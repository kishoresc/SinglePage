import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { WorkoutEntryComponent } from './components/workout-entry/workout-entry.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutService } from './services/workout.service';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutEntryComponent,
    WorkoutListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
  ],
  providers: [WorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
