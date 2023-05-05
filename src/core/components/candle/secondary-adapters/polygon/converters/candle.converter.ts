import { Converter } from '../../../../../shared-kernel/interface/converter';
import { Candle } from '../../../application/data/candle';
import { CandleEntity } from '../data/candle.entity';

export class CandleConverter implements Converter<Candle, CandleEntity> {
  public from(from: Candle): CandleEntity {
    return CandleEntity.fromObject(from);
  }

  public to(to: CandleEntity): Candle {
    return Candle.fromObject({
      timestamp: to.t,
      open: to.o,
      close: to.c,
      high: to.h,
      low: to.l,
    });
  }
}
