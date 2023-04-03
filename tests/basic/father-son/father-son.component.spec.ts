import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherSonComponent } from '../../../src/app/basic/father-son/father-son.component';

describe('FatherSonComponent', () => {
  let component: FatherSonComponent;
  let fixture: ComponentFixture<FatherSonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherSonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatherSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;

    //Importante limpiar jest
    jest.clearAllMocks();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Debe hacer match con el snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('No deben aparecer los botones si no hay cliente', () => {
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(0)
  });

  test('Deben aparecer los botones si hay cliente', () => {
    component.client = {id:1, name: 'Cristian'};

    fixture.detectChanges();
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2)
  });

  test('Si hay cliente hacer match con el snapshot', () => {
    component.client = {id:1, name: 'Cristian'};

    fixture.detectChanges();
    expect(compiled).toMatchSnapshot();
  });

  test('Debe emitir onDeleteClient con el boton de aliminar', () => {
    component.client = {id:1, name: 'Cristian'};
    fixture.detectChanges();

    jest.spyOn(component.onDeleteClient, 'emit' );

    const btnDelete = compiled.querySelector('[data-test=btn-delete]')
    btnDelete?.dispatchEvent(new Event('click'))

    expect(component.onDeleteClient.emit).toHaveBeenCalled()

  })

  test('Debe emitir OnclientUpdated con el boton de cambiar id', () => {
    component.client = {id:1, name: 'Cristian'};
    fixture.detectChanges();

    jest.spyOn(component.onClientUpdated, 'emit' );

    const btnChangeId = compiled.querySelector('[data-test=btn-id]')
    btnChangeId?.dispatchEvent(new Event('click'))

    expect(component.onClientUpdated.emit).toHaveBeenCalledWith({
      id: 5,
      name: 'Cristian'
    });
  });

  test('Debe emitir onChangeClient con el ID especificado si hay un cliente', () => {

    jest.spyOn(component.onClientUpdated, 'emit');

    component.onChange(10);
    expect(component.onClientUpdated.emit).not.toHaveBeenCalled()

    component.client = {id:1, name: 'Cristian'};
    fixture.detectChanges();
    component.onChange(10);

    expect(component.onClientUpdated.emit).toHaveBeenCalledWith({
      id: 10,
      name: 'Cristian'
    })

  })

});
