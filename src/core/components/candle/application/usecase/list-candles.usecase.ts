import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared-kernel/interface/use-case';
import { ListCandlesRequest } from '../data/dto/request/list-candles.request';
import { ListCandlesResponse } from '../data/dto/response/list-candles.response';
import { CandleRepository, CandleRepositoryType } from '../port/candle.repository';
import { Candle } from '../data/candle';
import { convertCSVToJson } from '../../../../shared-kernel/common/methods';

@Injectable()
export class ListCandlesUseCase implements UseCase<ListCandlesRequest, ListCandlesResponse[]> {
  constructor(
    @Inject(CandleRepositoryType)
    private readonly candleRepository: CandleRepository,
  ) {}

  public async execute(criteria: ListCandlesRequest): Promise<ListCandlesResponse[]> {
    try {
      const { symbol, interval, fromDate, toDate } = criteria;

      const fromStorage = true;

      const results: Candle[] = [];

      if (fromStorage) {
        const pathToFile = resolve(
          __dirname,
          `../../secondary-adapters/storage/${symbol}_${interval}.csv`,
        );

        const fetchedData: any = pathToFile.includes('csv')
          ? await convertCSVToJson(pathToFile, '\t')
          : JSON.parse(readFileSync(pathToFile, 'utf8'))?.data;

        const filteredCandles = fetchedData
          .sort((a, b) => new Date(b.Time).getTime() - new Date(a.Time).getTime())
          .filter((item) => {
            const itemTimestamp = new Date(item.Time).getTime();

            return itemTimestamp >= fromDate.getTime() && itemTimestamp <= toDate.getTime();
          })
          .map((item) =>
            Candle.fromObject({
              timestamp: new Date(item?.Time)?.getTime(),
              open: Number(item.Open) || null,
              close: Number(item.Close) || null,
              high: Number(item.High) || null,
              low: Number(item.Low) || null,
            }),
          );

        results.push(...filteredCandles);
      } else {
        const resultsFromPolygon = await this.candleRepository.getForexData(criteria);

        results.push(...resultsFromPolygon?.map(Candle.fromObject));
      }

      return results?.length ? results.map(ListCandlesResponse.fromObject) : [];
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
