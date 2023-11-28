import { PosicaoModel } from "./posicao.model"

export interface PosicaoTabelaModel {
    placa: string,
    nomePoi?: string,
    inicio?: Date,
    fim?: Date,
    periodo?: Date,
    posicoes?: Array<PosicaoModel>
}

export interface VeiculoPosicaoModel {
    placa: string
    posicoes: Array<PosicaoModel>
}