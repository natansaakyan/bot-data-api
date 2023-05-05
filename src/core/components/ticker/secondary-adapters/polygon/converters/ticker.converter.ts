import { Converter } from '../../../../../shared-kernel/interface/converter';
import { Ticker } from '../../../application/data/ticker';
import { TickerEntity } from '../data/ticker.entity';

export class TickerConverter implements Converter<Ticker, TickerEntity> {
  public from(from: Ticker): TickerEntity {
    return TickerEntity.fromObject(from);
  }

  public to(to: TickerEntity): Ticker {
    return Ticker.fromObject(to);
  }
}
