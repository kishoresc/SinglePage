import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-entry',
  imports: [FormsModule],
  templateUrl: './workout-entry.component.html',
  styleUrls: ['./workout-entry.component.scss']
})
export class WorkoutEntryComponent {
  newWorkout = { name: '', exercise: '', duration: 0 };
  @Output() workoutAdded = new EventEmitter<any>();

  successMessage: string | null = null;

  addWorkout() {
    if (this.newWorkout.name.trim() && this.newWorkout.exercise.trim() && this.newWorkout.duration > 0) {
      this.workoutAdded.emit({ ...this.newWorkout });  // Emit the workout
      this.newWorkout = { name: '', exercise: '', duration: 0 }; // Reset form
      this.successMessage = 'Workout added successfully!';
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  preventNegativeInput(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e' || event.key === '+' || event.key === '.') {
      event.preventDefault();
    }
  }
  
}





