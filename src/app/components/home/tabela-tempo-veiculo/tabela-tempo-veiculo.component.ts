import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-tempo-veiculo',
  templateUrl: './tabela-tempo-veiculo.component.html',
  styleUrls: ['./tabela-tempo-veiculo.component.scss']
})
export class TabelaTempoVeiculoComponent {

  @Input() tracking!: Array<any>;

  displayedColumns: string[] = ['veiculo', 'posicao', 'inicio', 'fim', 'periodo'];

}
