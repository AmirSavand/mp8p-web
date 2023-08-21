import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from '../../app.module';
import { Player } from '../../shared/interfaces/player';
import { ApiService } from '../../shared/services/api.service';
import { HomeModule } from '../home.module';
import { RegisterComponent } from './register.component';
import { RegisterModule } from './register.module';
import SpyObj = jasmine.SpyObj;

describe('RegisterComponent', () => {

  const fakePlayer: Player = {
    name: 'John',
    id: '1',
    match: '1',
  };

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let apiServiceSpy: SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['register']);
    apiServiceSpy.register.and.returnValue(of(fakePlayer));

    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HomeModule,
        RegisterModule,
      ],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy,
        },
      ],
      teardown: {
        destroyAfterEach: false,
      },
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('submit button should be disabled for invalid form', () => {
    const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('[type=submit]');
    expect(submitButton.disabled).toBeTrue();
    component.form.form.patchValue({ name: 'John' });
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  });

  it('should store name and ID into local storage after submitting', () => {
    component.form.form.patchValue({ name: fakePlayer.name });
    component.submit();
    expect(localStorage.name).toBe(fakePlayer.name);
    expect(localStorage.player).toBe(fakePlayer.id);
  });
});
