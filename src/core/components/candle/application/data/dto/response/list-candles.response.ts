import { ApiProperty } from '@nestjs/swagger';
import { Fillable } from '../../../../../../shared-kernel/common/fillable.decorator';

export class ListCandlesResponse {
  @ApiProperty()
  open: number;

  @ApiProperty()
  close: number;

  @ApiProperty()
  low: number;

  @ApiProperty()
  high: number;

  @ApiProperty()
  timestamp: number;

  @Fillable
  public static fromObject(_obj: ListCandlesResponse): ListCandlesResponse {
    return new ListCandlesResponse();
  }
}
