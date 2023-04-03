import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherComponent } from '../../../src/app/basic/father/father.component';
import { FatherSonComponent } from '../../../src/app/basic/father-son/father-son.component';
import { By } from '@angular/platform-browser';

describe('FatherComponent', () => {
  let component: FatherComponent;
  let fixture: ComponentFixture<FatherComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherComponent, FatherSonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('DEbe hacer match con el snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('Debe establecer el cliente con el nombre indicado', () => {
    component.onSetClient('Pedro');
    fixture.detectChanges();

    const codeDiv = compiled.querySelector('.mt-2');

    expect(codeDiv?.textContent).toContain('"name"')
    expect(codeDiv?.textContent).toContain('"Pedro"')

  })


  test('Debe borrar el ciente si se emite onDeleteClient (hijo)', () => {
    component.client = {id:1, name: 'Cristian'}
    fixture.detectChanges();

    //Se toma control del compoennete hijo
    const sonDebugElement = fixture.debugElement.query( By.directive(FatherSonComponent) )
    const sonComponent:FatherSonComponent = sonDebugElement.componentInstance;
    //Se emite el evento
    sonComponent.onDeleteClient.emit();
    //Se valida que si llego lo esperado
    expect(component.client).toBe(undefined);

  })

  test('Debe de actualizar el cliente onClientUpdated', () => {
    component.client = {id:1, name: 'Cristian'}
    fixture.detectChanges();

    //Se toma control del compoennete hijo
    const sonDebugElement = fixture.debugElement.query( By.directive(FatherSonComponent) )
    const sonComponent:FatherSonComponent = sonDebugElement.componentInstance;
    //Se emite el evento
    sonComponent.onClientUpdated.emit({
      id: 5,
      name: 'Cristian'
    });
    //Se valida que si llego lo esperado
    expect(component.client).toEqual({id:5, name:'Cristian'});
  })



});
