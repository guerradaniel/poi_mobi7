import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaTempoVeiculoComponent } from './tabela-tempo-veiculo.component';

describe('TabelaTempoVeiculoComponent', () => {
  let component: TabelaTempoVeiculoComponent;
  let fixture: ComponentFixture<TabelaTempoVeiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaTempoVeiculoComponent]
    });
    fixture = TestBed.createComponent(TabelaTempoVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
