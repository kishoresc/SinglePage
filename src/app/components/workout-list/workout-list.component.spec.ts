import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent, Workout } from './workout-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutListComponent, MatPaginatorModule, MatTableModule, FormsModule, NoopAnimationsModule], // ✅ Move WorkoutListComponent to imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    component.workoutList = new MatTableDataSource<Workout>([
      { name: 'Morning Routine', exercise: 'Push-ups', duration: 30 }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct table columns', () => {
    expect(component.displayedColumns).toEqual(['name', 'exercise', 'duration']);
  });

  it('should initialize paginator after view init', () => {
    fixture.detectChanges();
    component.paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;
    component.ngAfterViewInit();
    expect(component.workoutList.paginator).toBe(component.paginator);
  });

  it('should add a workout to the list', () => {
    const newWorkout: Workout = { name: 'Evening Routine', exercise: 'Squats', duration: 40 };
    component.onWorkoutAdded(newWorkout);
  
    expect(component.workoutList.data.length).toBe(2); // Now correctly updates
    expect(component.workoutList.data).toContain(newWorkout); // The new workout is now in the list
  });
  
});
