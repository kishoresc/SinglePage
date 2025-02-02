import { Component, ViewChild, HostListener} from '@angular/core';
import { WorkoutService } from './services/workout.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutEntryComponent } from './components/workout-entry/workout-entry.component';

@Component({
  selector: 'app-root',
  imports: [WorkoutListComponent, WorkoutEntryComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Health Challenge Tracker';
  workoutList = new MatTableDataSource([
    { name: 'vijay' , exercise: 'Jumping', duration: 30},
    { name: 'aswin' , exercise: 'Running', duration: 10},
    { name: 'john' , exercise: 'Cycling', duration: 5}
  ]);
  displayedColumns: string[] = ['name', 'exercise', 'duration'];
  successMessage: string | null = null;
  searchText: string = '';  
  warningMessage: string = "If you'd like to add another exercise for the same user, simply enter their name exactly as before. 😊";

  public selectedUser: string | null = null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private workoutService: WorkoutService) {}

  showScrollTopButton: boolean = false;

  // Scroll to Top function
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Listen to scroll event to show or hide the scroll button
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if scrolled down enough to show the scroll top button
    if (window.scrollY > 100) {  // Show button when scrolled down more than 100px
      this.showScrollTopButton = true;
    } else {
      this.showScrollTopButton = false;  // Hide button if at the top
    }
  }

  ngOnInit(): void {
    this.loadWorkouts();
  }

  ngAfterViewInit() {
    this.workoutList.paginator = this.paginator!;
  }

  loadWorkouts() {
    const workouts = localStorage.getItem('workouts');
    if (workouts) {
      this.workoutList.data = JSON.parse(workouts); // Ensure this is an array
    }
    // localStorage.clear();
  }

  // Save workouts to localStorage
  saveWorkouts() {
    localStorage.setItem('workouts', JSON.stringify(this.workoutList.data));
  }

  applyFilter() {
    this.workoutList.filter = this.searchText.trim().toLowerCase();
  }

  // You can pass the success message from the workout entry component
  handleSuccessMessage(message: string) {
    this.successMessage = message;
  }

  
  onWorkoutAdded(workout: { name: string; exercise: string; duration: number; }) {
    const existingWorkout = this.workoutList.data.find(item => item.name === workout.name);

    if (existingWorkout) {
      // Check if the same exercise already exists
      const exercises = existingWorkout.exercise.split(', ');

      if (exercises.includes(workout.exercise)) {
        // If the same exercise exists, just add the duration
        existingWorkout.duration += workout.duration;
      } else {
        // Otherwise, append the exercise name and add the duration
        existingWorkout.exercise += `, ${workout.exercise}`;
        existingWorkout.duration += workout.duration;
      }
    } else {
      // If the person doesn't exist, add a new entry
      this.workoutList.data = [...this.workoutList.data, workout];
    }

    // Refresh the data source
    this.workoutList.data = [...this.workoutList.data]; 

    // Save updated workout list to localStorage
    this.saveWorkouts();
  }

  
    
  onUserSelect(event: any) {
    this.selectedUser = event.target.value;
    
  }


  get workoutUsers() {
    return this.workoutList.data;
  }
  
  
}