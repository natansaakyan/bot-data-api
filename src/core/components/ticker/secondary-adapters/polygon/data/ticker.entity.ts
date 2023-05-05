import { Fillable } from '../../../../../shared-kernel/common/fillable.decorator';
import { Ticker } from '../../../application/data/ticker';

export class TickerEntity {
  active: boolean;

  market: string;

  ticker: string;

  @Fillable
  public static fromObject(_obj: Ticker): TickerEntity {
    return new TickerEntity();
  }
}
