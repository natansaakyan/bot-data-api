import { Fillable } from '../../../../shared-kernel/common/fillable.decorator';

export class Ticker {
  market: string;

  ticker: string;

  active: boolean;

  @Fillable
  public static fromObject(_obj: Ticker): Ticker {
    return new Ticker();
  }
}
