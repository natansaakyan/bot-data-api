import { ApiProperty } from '@nestjs/swagger';
import { Fillable } from 'src/core/shared-kernel/common/fillable.decorator';
import { IsEnum, IsOptional } from 'class-validator';
import { Market } from '../../../../../../shared-kernel/data/market.enum';
import { Sort } from '../../../../../../shared-kernel/data/sort.enum';

export class ListTickersRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false, enum: Market })
  @IsEnum(Market)
  @IsOptional()
  market?: Market;

  @ApiProperty({ required: false, enum: Sort })
  @IsEnum(Sort)
  @IsOptional()
  order?: Sort;

  @Fillable
  public static fromObject(_obj: ListTickersRequest): ListTickersRequest {
    return new ListTickersRequest();
  }
}
