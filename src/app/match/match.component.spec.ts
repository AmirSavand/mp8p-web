import { ComponentFixture, TestBed, waitForAsync, inject, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser'
import { MatchComponent } from './match.component';
import { DebugElement, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../shared/services/api.service';
import { HeaderModule } from '../shared/modules/header/header.module';

const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: () => 'mocked_value',
    },
  },
};
let component: MatchComponent;
let fixture: ComponentFixture<MatchComponent>
let de: DebugElement
let service: ApiService;
let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HeaderModule],
      declarations: [MatchComponent],
      providers: [ApiService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
      ],

    }).compileComponents();
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(()=> {
    fixture = TestBed.createComponent(MatchComponent)
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create the match', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as text 'match'`,() => {
    expect(component).toContain('Match');
  });
  it(`should render 'won' in a span tag`,() => {
    expect(de.query(By.css('span')).nativeElement.innerText).toContain('won');
  });

  it(`should say match is not finished`,() => {
   expect(component.matchStatus).toContain('2');
  });
