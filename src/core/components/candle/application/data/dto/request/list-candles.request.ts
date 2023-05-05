import { ApiProperty } from '@nestjs/swagger';
import { Fillable } from 'src/core/shared-kernel/common/fillable.decorator';
import { Interval } from '../../../../../../shared-kernel/data/interval.enum';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformBoolean } from '../../../../../../shared-kernel/common/transform.decorator';
import { Symbols } from '../../../../../../shared-kernel/data/symbols.enum';

export class ListCandlesRequest {
  // @ApiProperty({ required: false })
  // @IsOptional()
  // @TransformBoolean()
  // fromStorage?: boolean;

  @ApiProperty({ required: true, enum: Symbols })
  @IsEnum(Symbols)
  symbol: Symbols;

  @ApiProperty({ required: true, enum: Interval })
  @IsEnum(Interval)
  @Transform(({ value }) => Number(value))
  interval: Interval;

  @ApiProperty({ required: true })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  fromDate: Date;

  @ApiProperty({ required: true })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  toDate: Date;

  // @ApiProperty({ required: false })
  // @IsOptional()
  // @TransformBoolean()
  // adjusted?: boolean;
  //
  // @ApiProperty({ required: false })
  // @IsOptional()
  // @Transform(({ value }) => Number(value))
  // limit?: number;

  @Fillable
  public static fromObject(_obj: ListCandlesRequest): ListCandlesRequest {
    return new ListCandlesRequest();
  }
}
