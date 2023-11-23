import { Component, OnInit } from '@angular/core';
import { PontoInteresseModel } from 'src/app/models/ponto-interesse.model';
import { PosicaoModel } from 'src/app/models/posicao.model';
import { ConverteDataPipe } from 'src/app/pipes/converte-data.pipe';
import { PoisService } from 'src/app/services/pois.service';
import { VeiculosService } from 'src/app/services/veiculos.service';

import haversine from 'haversine-distance'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data!: Date;
  maxDate: Date;
  placas: Array<string> = [];
  pontos: Array<PontoInteresseModel> = [];
  veiculoPorPosicao: Array<any> = [];
  trackingList: Array<any> = [];
  carroEscolhido: string = "";
  posicaoTracked: Array<PosicaoModel> = [];

  constructor(
    private veiculosService: VeiculosService,
    private poisService: PoisService,
    private converteData: ConverteDataPipe,
  ) {
    this.maxDate = new Date(Date.now())
  }

  ngOnInit(): void {
    this.getPlacas();
    this.getPOI();
  }

  private getPlacas(): void {
    this.veiculosService.getPlacas().subscribe((data) => {
      this.placas = data;
      this.getPosicaoVeiculo();
    })
  }

  private getPOI(): void {
    this.poisService.getPOI().subscribe((data) => {
      this.pontos = data
    })
  }

  consultar(): void {
    this.veiculoPorPosicao = [];
    this.getPosicaoVeiculo(this.carroEscolhido || undefined, this.data)
  }

  public filtroTabela(placa: string) {
    return this.trackingList.filter(tracking => tracking.placa === placa)
  }

  private getPosicaoVeiculo(placa?: string, data?: Date): void {
    this.trackingList = [];
    this.veiculosService.getPosicao(placa, this.converteData.transform(data)).subscribe((data) => {
      if (placa) {
        this.veiculoPorPosicao.push({
          placa: placa,
          posicoes: data
        })
      } else {
        this.veiculoPorPosicao = this.placas.map(placa => ({
          placa: placa,
          posicoes: data.filter((posicoes) => {
            return posicoes.placa == placa;
          })
        }))
      }
      this.obterPOI();
    })
  }

  obterPOI() {
    this.veiculoPorPosicao.forEach(veiculos => {
      this.pontos.forEach((poi) => {
        this.posicaoTracked = [];
        veiculos.posicoes.forEach((pos: PosicaoModel) => {

          if (
            this.posicoesMatch(pos.latitude, pos.longitude, poi.latitude, poi.longitude, poi.raio)
            && (veiculos.posicoes.indexOf(pos) + 1) !== veiculos.posicoes.length) {
            this.posicaoTracked.push(pos);
          } else if (
            this.posicoesMatch(pos.latitude, pos.longitude, poi.latitude, poi.longitude, poi.raio)
            && (veiculos.posicoes.indexOf(pos) + 1) === veiculos.posicoes.length) {
            this.posicaoTracked.push(pos);
            this.tracking(pos.placa, poi.nome, this.posicaoTracked);
            this.posicaoTracked = [];
          } else {
            if (this.posicaoTracked.length !== 0) {
              this.tracking(pos.placa, poi.nome, this.posicaoTracked);
              this.posicaoTracked = [];
            }
          }
        })
      })
    })
  }

  private tracking(placa: string, poiName: string, posicoes: Array<any>) {
    this.trackingList.push({
      placa: placa,
      nomePoi: poiName,
      inicio: posicoes[0].data,
      fim: posicoes[posicoes.length - 1].data,
      periodo: this.periodoPOI(posicoes[0].data, posicoes[posicoes.length - 1].data),
      posicoes: this.posicaoTracked,
    });
  }

  private posicoesMatch(latitude: number, longitude: number, latPOI: number, lonPOI: number, raio: number): boolean {
    let posicaoVeiculo = { lat: latitude, lon: longitude };
    let POIs = { lat: latPOI, lon: lonPOI }
    let distance = haversine(posicaoVeiculo, POIs);
    return distance <= raio;
  }

  private periodoPOI(inicio: Date, fim: Date) {
    return this.calculoTempo(inicio, fim);
  }

  private calculoTempo(dataInicio: Date, dataFim: Date) {
    let delta: number = Math.abs(new Date(dataFim).getTime() - new Date(dataInicio).getTime()) / 1000;
    return [
      ['days', 24 * 60 * 60],
      ['hours', 60 * 60],
      ['minutes', 60],
      ['seconds', 1]
    ].reduce((acc: any, [key, value]) => (acc[key] = key == 'seconds' ? (Math.floor(delta / Number(value)) >= 1 ? Math.floor(delta / Number(value)) : 1) : Math.floor(delta / Number(value)), delta -= acc[key] * Number(value), acc), {});
  }
}
