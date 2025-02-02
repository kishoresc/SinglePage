import { Injectable } from '@angular/core';
import { Workout } from '../components/workout.model'; // Import Workout interface

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = []; // Use the Workout type for the array

  addWorkout(workout: Workout): void {
    this.workouts.push(workout); // Ensure the type of workout is correct
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }
}
