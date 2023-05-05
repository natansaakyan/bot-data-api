import { Inject, Injectable } from '@nestjs/common';
import { Candle } from '../../../application/data/candle';
import { CandleConverter } from '../converters/candle.converter';
import {
  PolygonServiceInterface,
  PolygonServiceInterfaceType,
} from '../../../../../shared-kernel/port/polygon.interface';
import { CandleRepository } from '../../../application/port/candle.repository';
import { ListCandlesRequest } from '../../../application/data/dto/request/list-candles.request';

@Injectable()
export class CandleRepositoryAdapter implements CandleRepository {
  private readonly converter = new CandleConverter();

  constructor(
    @Inject(PolygonServiceInterfaceType)
    private polygonService: PolygonServiceInterface,
  ) {}

  public async getForexData(criteria: ListCandlesRequest): Promise<Candle[]> {
    const candles = await this.polygonService.getMarketData({ ...criteria });

    return candles.length ? candles.map(this.converter.to) : null;
  }
}
