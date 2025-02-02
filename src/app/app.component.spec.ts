import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkoutService } from './services/workout.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutEntryComponent } from './components/workout-entry/workout-entry.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatPaginatorModule, FormsModule],
      declarations: [AppComponent, WorkoutListComponent, WorkoutEntryComponent],
      providers: [WorkoutService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with predefined workouts', () => {
    expect(component.workoutList.data.length).toBe(3);
  });

  it('should add a new workout', () => {
    const newWorkout = { name: 'Mike', exercise: 'Swimming', duration: 20 };
    component.onWorkoutAdded(newWorkout);

    expect(component.workoutList.data.length).toBe(4);
    expect(component.workoutList.data.find(w => w.name === 'Mike')).toEqual(newWorkout);
  });

  it('should update duration when the same user adds the same exercise', () => {
    const newWorkout = { name: 'vijay', exercise: 'Jumping', duration: 10 };
    component.onWorkoutAdded(newWorkout);

    const updatedWorkout = component.workoutList.data.find(w => w.name === 'vijay');
    expect(updatedWorkout?.duration).toBe(40);
  });

  it('should append a new exercise if user exists but with a different exercise', () => {
    const newWorkout = { name: 'vijay', exercise: 'Swimming', duration: 15 };
    component.onWorkoutAdded(newWorkout);

    const updatedWorkout = component.workoutList.data.find(w => w.name === 'vijay');
    expect(updatedWorkout?.exercise).toContain('Jumping, Swimming');
    expect(updatedWorkout?.duration).toBe(45);
  });

  it('should filter workouts correctly', () => {
    component.searchText = 'Jumping';
    component.applyFilter();

    expect(component.workoutList.filteredData.length).toBe(1);
  });

  it('should save workouts to localStorage', () => {
    spyOn(localStorage, 'setItem');
    component.saveWorkouts();

    expect(localStorage.setItem).toHaveBeenCalledWith('workouts', jasmine.any(String));
  });

  it('should load workouts from localStorage', () => {
    const mockData = JSON.stringify([
      { name: 'Alex', exercise: 'Jogging', duration: 25 }
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(mockData);

    component.loadWorkouts();

    expect(component.workoutList.data.length).toBe(1);
    expect(component.workoutList.data[0].name).toBe('Alex');
  });

  it('should toggle scroll-to-top button visibility based on scroll position', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(150);
    component.onWindowScroll();
    expect(component.showScrollTopButton).toBeTrue();

    spyOnProperty(window, 'scrollY', 'get').and.returnValue(50);
    component.onWindowScroll();
    expect(component.showScrollTopButton).toBeFalse();
  });

  it('should show the scroll button when scrolled more than 100px', () => {
    // Simulate scrolling down by 150px
    window.scrollTo(0, 150);
    component.onWindowScroll();
  
    // Check if the scroll button is visible
    expect(component.showScrollTopButton).toBeTrue();
  });
  
  it('should update selectedUser when onUserSelect is triggered', () => {
    const event = { target: { value: 'vijay' } };
    component.onUserSelect(event);
    expect(component.selectedUser).toBe('vijay');
  });
});
