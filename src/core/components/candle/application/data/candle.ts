import { Fillable } from '../../../../shared-kernel/common/fillable.decorator';

export class Candle {
  timestamp: number;

  open: number;

  close: number;

  high: number;

  low: number;

  @Fillable
  public static fromObject(_obj: Candle): Candle {
    return new Candle();
  }
}
