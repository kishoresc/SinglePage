import { Component, ViewChild, AfterViewInit, Input, EventEmitter, Output  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

export interface Workout {
  name: string;
  exercise: string;
  duration: number;
}

@Component({
  selector: 'app-workout-list',
  imports: [MatPaginator, MatTableModule, FormsModule],
  standalone: true, // ✅ For standalone component
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements AfterViewInit {

  @Input() workoutList: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = ['name', 'exercise', 'duration'];
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  ngAfterViewInit() {
    this.workoutList.paginator = this.paginator;
  }

  onWorkoutAdded(workout: any) {
    const updatedWorkouts = [...this.workoutList.data, workout]; // Create a new array with the new workout
    this.workoutList.data = updatedWorkouts; // ✅ Assign the new array to update the table
  }
  
  
}
