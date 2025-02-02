import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from './services/workout.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutEntryComponent } from './components/workout-entry/workout-entry.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let workoutServiceMock: any;

  beforeEach(async () => {
    workoutServiceMock = {
      getWorkouts: jasmine.createSpy('getWorkouts').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, MatPaginatorModule, MatTableModule],
      providers: [{ provide: WorkoutService, useValue: workoutServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default warning message visible', () => {
    expect(component.warningMessage).toBe(
      "If you'd like to add another exercise for the same user, simply enter their name exactly as before. 😊"
    );
  });

  it('should add a new workout entry', () => {
    const newWorkout = { name: 'Alice', exercise: 'Push-ups', duration: 20 };
    component.onWorkoutAdded(newWorkout);

    expect(component.workoutList.data.some(w => w.name === 'Alice' && w.exercise === 'Push-ups' && w.duration === 20)).toBeTrue();
  });

  it('should update duration if the same user and exercise exist', () => {
    component.workoutList.data = [{ name: 'Bob', exercise: 'Jumping', duration: 30 }];

    const newWorkout = { name: 'Bob', exercise: 'Jumping', duration: 15 };
    component.onWorkoutAdded(newWorkout);

    expect(component.workoutList.data.find(w => w.name === 'Bob')?.duration).toBe(45);
  });

  it('should append exercise if the same user but different exercise', () => {
    component.workoutList.data = [{ name: 'Charlie', exercise: 'Running', duration: 20 }];

    const newWorkout = { name: 'Charlie', exercise: 'Swimming', duration: 15 };
    component.onWorkoutAdded(newWorkout);

    const updatedWorkout = component.workoutList.data.find(w => w.name === 'Charlie');
    expect(updatedWorkout?.exercise).toContain('Running, Swimming');
    expect(updatedWorkout?.duration).toBe(35);
  });

  it('should select a user', () => {
    const mockEvent = { target: { value: 'David' } };
    component.onUserSelect(mockEvent);

    expect(component.selectedUser).toBe('David');
  });

  it('should show the scroll button when scrolled down', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(150);
    component.onWindowScroll();
    expect(component.showScrollTopButton).toBeTrue();
  });

  it('should hide the scroll button when at the top', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(0);
    component.onWindowScroll();
    expect(component.showScrollTopButton).toBeFalse();
  });

});
