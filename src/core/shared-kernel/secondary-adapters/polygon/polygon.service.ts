import { Injectable } from '@nestjs/common';
import { ListMarketData, ListTickers, PolygonServiceInterface } from '../../port/polygon.interface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { format } from 'date-fns';
import { Ticker } from '../../../components/ticker/application/data/ticker';
import { Sort } from '../../data/sort.enum';
import { CandleEntity } from '../../../components/candle/secondary-adapters/polygon/data/candle.entity';

@Injectable()
export class PolygonService implements PolygonServiceInterface {
  private readonly baseUrl: string = 'https://api.polygon.io';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getMarketData(params: ListMarketData): Promise<CandleEntity[]> {
    const { interval, symbol, fromDate, toDate, adjusted = false, limit = 50000 } = params;

    const from = format(fromDate, 'yyyy-MM-dd');
    const to = format(toDate, 'yyyy-MM-dd');

    const intervalByMinutes = interval / 60;

    const candles: CandleEntity[] = [];

    const url = `${
      this.baseUrl
    }/v2/aggs/ticker/${symbol}/range/${intervalByMinutes}/minute/${from}/${to}?sort=desc&adjusted=${adjusted}&limit=${limit}&apiKey=${this.configService.get(
      'authorization.polygonApiKey',
    )}`;

    let formattedNextUrl = '';
    // console.log(url);

    let count = 0;
    try {
      while (formattedNextUrl !== null) {
        const tempUrl = formattedNextUrl || url;
        const result = await this.httpService.get(tempUrl).toPromise();
        candles.push(...result.data.results);

        formattedNextUrl = result.data?.next_url
          ? result.data.next_url +
            `&apiKey=${this.configService.get('authorization.polygonApiKey')}`
          : null;
        count++;
        if (count == 4) {
          count = 0;
          // console.log('sleeping for 1 minute');
          await new Promise((resolve) => setTimeout(resolve, 60000));
        }
      }
    } catch (err) {
      console.log(err.message);
    }

    // console.log(new Date(candles[0]?.t));

    return candles;
  }

  public async getTicker(params: ListTickers): Promise<Ticker[]> {
    const tickers: Ticker[] = [];

    const { market, order = Sort.DESC, search } = params;

    let url = `${
      this.baseUrl
    }/v3/reference/tickers?&limit=1000&active=true&apiKey=${this.configService.get(
      'authorization.polygonApiKey',
    )}`;

    const marketTag = market.split(':');

    if (marketTag[1]) {
      url = `${url}&market=${marketTag[1]}`;
    }

    if (order) {
      url = `${url}&order=${order}`;
    }

    if (search) {
      url = `${url}&search=${marketTag[0]}:${search}`;
    }

    let nextUrl = '';

    while (nextUrl !== null) {
      const tempUrl = nextUrl ? url.concat(`&cursor=${nextUrl}`) : url;

      const result = await this.httpService.get(tempUrl).toPromise();
      tickers.push(...result.data.results);
      const cursor = result.data?.next_url?.split('cursor=')[1];
      nextUrl = cursor || null;
    }

    return tickers;
  }
}
