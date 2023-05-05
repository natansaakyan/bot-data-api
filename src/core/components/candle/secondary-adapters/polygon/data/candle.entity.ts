import { Fillable } from '../../../../../shared-kernel/common/fillable.decorator';
import { Candle } from '../../../application/data/candle';

export class CandleEntity {
  // Close
  c: number;

  // High
  h: number;

  // Low
  l: number;

  // Number of transactions
  n: number;

  // Open
  o: number;

  // Timestamp
  t: number;

  // Volume
  v: number;

  // VWAP
  vw: number;

  @Fillable
  public static fromObject(_obj: Candle): CandleEntity {
    return new CandleEntity();
  }
}
