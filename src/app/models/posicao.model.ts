export interface PosicaoModel {
    id: number;
    placa: string;
    data: Date;
    velocidade: number;
    latitude: number;
    longitude: number;
    ignicao: boolean;
}