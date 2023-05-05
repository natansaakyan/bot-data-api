import { ApiProperty } from '@nestjs/swagger';
import { Fillable, FillTransform } from '../../../../../../shared-kernel/common/fillable.decorator';
import { Ticker } from '../../ticker';

export class ListTickersResponse {
  @ApiProperty()
  @FillTransform((value) => Ticker.fromObject(value))
  tickers: Ticker[];

  @ApiProperty()
  count: number;

  @Fillable
  public static fromObject(_obj: ListTickersResponse): ListTickersResponse {
    return new ListTickersResponse();
  }
}
