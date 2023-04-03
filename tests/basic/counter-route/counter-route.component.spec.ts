import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterRouteComponent } from '../../../src/app/basic/counter-route/counter-route.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('CounterRouteComponent', () => {
  let component: CounterRouteComponent;
  let fixture: ComponentFixture<CounterRouteComponent>;

  test('Debe terne el valor inicial en 0', async() => {

    await TestBed.configureTestingModule({
      declarations: [ CounterRouteComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.counter).toBe(0)

  });

  test('Debe terne el valor inicial en 100 en la ruta counter/100', async() => {

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get(param:string){
            return  (param === 'initial') ? '100' : undefined;
          }
        }
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ CounterRouteComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.counter).toBe(100)

  });

  test('Debe tener el valor inicial en 10 en la ruta counter/20abc', async() => {

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get(param:string){
            return  (param === 'initial') ? '20abc' : undefined;
          }
        }
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ CounterRouteComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.counter).toBe(10)

  });

});
