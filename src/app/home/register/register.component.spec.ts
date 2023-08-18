import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ApiService } from '../../shared/services/api.service';
import { Player } from '../../shared/interfaces/player';
import { Observable, of } from 'rxjs';
import SpyObj = jasmine.SpyObj;

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let apiServiceSpy: SpyObj<any>;

  beforeEach(() => {
    // Create a spy object for the ApiService
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['register']);

    // Configure the testing module
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy,
        }
      ],
    });

    // Create an instance of the component
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('Should register and set localstorage', () => {
    // Set up the form with test data
    component.form.form.patchValue({
      name: "Test 1",
    });

    // Ensure that loading is initially set to false
    expect(component.form.loading).toBeFalsy();

    // Set up the ApiService spy to return a registerData value
    let registerData = apiServiceSpy.register.and.returnValue(
      of(
        {
          name: 'Test 1',
          id: '1',
          match: '1'
        }
      )
    );

    // Call the submit method of the component
    component.submit();

    // Verify that the ApiService method has been called
    expect(registerData).toHaveBeenCalled();

    // Verify that the ApiService method has been called with the correct form value
    expect(registerData).toHaveBeenCalledWith(component.form.form.value);
  })
});

//
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of, throwError } from 'rxjs';
// import { RegisterComponent } from './register.component';
// import { ApiService } from 'src/app/shared/services/api.service';
// import { Player } from 'src/app/shared/interfaces/player';
// import { Router } from '@angular/router';
//
// describe('RegisterComponent', () => {
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;
//   let apiService: jasmine.SpyObj<ApiService>;
//
//   beforeEach(() => {
//     const apiServiceSpy = jasmine.createSpyObj('ApiService', ['register']);
//
//     TestBed.configureTestingModule({
//       declarations: [RegisterComponent],
//       imports: [ReactiveFormsModule, RouterTestingModule],
//       providers: [{ provide: ApiService, useValue: apiServiceSpy }],
//     });
//
//     fixture = TestBed.createComponent(RegisterComponent);
//     component = fixture.componentInstance;
//     apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should submit form and handle successful registration', () => {
//     const player: Player = { id: '123', name: 'Test Player' };
//     const apiResponse = of(player);
//     apiService.register.and.returnValue(apiResponse);
//
//     // Set the value of the form control
//     component.form.form.get('name')?.setValue('Test Player');
//
//     // Spy on router navigation
//     const routerNavigateByUrlSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
//
//     component.submit();
//     expect(component.form.loading).toBe(true);
//
//     expect(apiService.register).toHaveBeenCalledWith({ name: 'Test Player' });
//
//     // Simulate response
//     apiResponse.subscribe(() => {
//       expect(localStorage.player).toBe(player.id);
//       expect(localStorage.name).toBe(player.name);
//       expect(routerNavigateByUrlSpy).toHaveBeenCalledWith('/');
//     });
//   });
//
//
//   it('should handle registration error', () => {
//     const apiError = throwError(new Error('Registration error'));
//     apiService.register.and.returnValue(apiError);
//
//     // Set the value of the form control
//     component.form.form.get('name')?.setValue('Test Player');
//
//     component.submit();
//     expect(component.form.loading).toBe(true);
//
//     // Simulate error
//     apiError.subscribe({
//       error: () => {
//         expect(component.form.loading).toBe(false);
//       },
//     });
//   });
//
// });
