import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutEntryComponent } from './workout-entry.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('WorkoutEntryComponent', () => {
  let component: WorkoutEntryComponent;
  let fixture: ComponentFixture<WorkoutEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [WorkoutEntryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty workout object', () => {
    expect(component.newWorkout).toEqual({ name: '', exercise: '', duration: 0 });
  });

  it('should emit workoutAdded event when valid workout is added', () => {
    spyOn(component.workoutAdded, 'emit');

    component.newWorkout = { name: 'Morning Routine', exercise: 'Push-ups', duration: 30 };
    component.addWorkout();

    expect(component.workoutAdded.emit).toHaveBeenCalledWith({
      name: 'Morning Routine',
      exercise: 'Push-ups',
      duration: 30
    });
    expect(component.successMessage).toBe('Workout added successfully!');
    expect(component.newWorkout).toEqual({ name: '', exercise: '', duration: 0 }); // Reset form
  });

  it('should show alert if invalid data is provided', () => {
    spyOn(window, 'alert');

    component.newWorkout = { name: '', exercise: '', duration: 0 };
    component.addWorkout();

    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields correctly.');
  });

  it('should prevent negative, exponential, and decimal inputs', () => {
    const event = new KeyboardEvent('keydown', { key: '-' });
    spyOn(event, 'preventDefault');

    component.preventNegativeInput(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});
