import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoisService } from 'src/app/services/pois.service';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  maxDate: Date;
  placas: Array<string> = [];
  pontos: Array<any> = [];

  constructor(
    private veiculosService: VeiculosService,
    private poisService: PoisService
  ) {
    this.maxDate = new Date(Date.now())
  }

  ngOnInit(): void {
    this.getPlacas();
    this.getPois();
  }

  private getPlacas(): void {
    this.veiculosService.getPlacas().subscribe((data) => {
      this.placas = data;
    })
  }

  private getPois(): void {
    this.poisService.getPois().subscribe((data) => {
      this.pontos = data  
    })
  }

}
