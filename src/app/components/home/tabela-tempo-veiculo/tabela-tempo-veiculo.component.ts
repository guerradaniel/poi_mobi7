import { Component } from '@angular/core';

@Component({
  selector: 'app-tabela-tempo-veiculo',
  templateUrl: './tabela-tempo-veiculo.component.html',
  styleUrls: ['./tabela-tempo-veiculo.component.scss']
})
export class TabelaTempoVeiculoComponent {

  displayedColumns: string[] = ['veiculo', 'posicao', 'inicio', 'fim', 'periodo'];

}
