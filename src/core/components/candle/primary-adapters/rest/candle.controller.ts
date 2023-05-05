import { Query, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListCandlesUseCase } from '../../application/usecase/list-candles.usecase';
import { ClearUndefinedPipe } from '../../../../shared-kernel/pipe/clear-undefined.pipe';
import { ListCandlesResponse } from '../../application/data/dto/response/list-candles.response';
import { ListCandlesRequest } from '../../application/data/dto/request/list-candles.request';
import { ApiResponseDoc } from 'src/core/shared-kernel/rest/dto/api-response.dto';

@Controller('data')
@ApiTags('Data')
export class CandleController {
  constructor(private readonly listDataUseCase: ListCandlesUseCase) {}

  @Get()
  @ApiResponseDoc(ListCandlesResponse)
  public async listData(
    @Query(ClearUndefinedPipe) criteria: ListCandlesRequest,
  ): Promise<ListCandlesResponse[]> {
    return this.listDataUseCase.execute(criteria);
  }
}
