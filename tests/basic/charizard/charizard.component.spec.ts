import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CharizardComponent } from '../../../src/app/basic/charizard/charizard.component';
import { PokemonService } from '../../../src/app/basic/services/pokemon.service';

describe('CharizardComponent', () => {
  let component: CharizardComponent;
  let fixture: ComponentFixture<CharizardComponent>;
  let compiled: HTMLElement;
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharizardComponent ],
      imports:[HttpClientTestingModule],
      providers: [PokemonService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharizardComponent);
    component = fixture.componentInstance;
    //Se deben agregar
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Debe de hacer match con el snapshot', () => {
    expect(compiled.innerHTML).toMatchSnapshot();
  });

  test('Debe mostrar un loading al inicio', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent).toContain('Loading...')

  })

  test('Debe cargar a charizard inmediatamente', () => {
    const mockPokemon = {
      name: 'charizardo!!',
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.pn'
      }
    };

    const request = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/6`);

    expect(request.request.method).toBe('GET');
    request.flush(mockPokemon)

    fixture.detectChanges();

    const h3 = compiled.querySelector('h3');
    const img = compiled.querySelector('img');

    expect(h3?.textContent?.toLocaleLowerCase()).toContain(mockPokemon.name.toLocaleLowerCase());
    expect(img?.src).toBe(mockPokemon.sprites.front_default);
    expect(img?.alt).toBe(mockPokemon.name);

  })

});
