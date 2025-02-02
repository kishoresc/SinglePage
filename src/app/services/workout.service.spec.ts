import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { Workout } from '../components/workout.model';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a workout', () => {
    const workout: Workout = { name: 'Morning Routine', exercise: 'Push-ups', duration: 30 };
    service.addWorkout(workout);
    expect(service.getWorkouts().length).toBe(1);
    expect(service.getWorkouts()[0]).toEqual(workout);
  });

  it('should retrieve all workouts', () => {
    const workout1: Workout = { name: 'Morning Routine', exercise: 'Push-ups', duration: 30 };
    const workout2: Workout = { name: 'Evening Routine', exercise: 'Squats', duration: 45 };
    
    service.addWorkout(workout1);
    service.addWorkout(workout2);

    const workouts = service.getWorkouts();
    expect(workouts.length).toBe(2);
    expect(workouts).toContain(workout1);
    expect(workouts).toContain(workout2);
  });
});
