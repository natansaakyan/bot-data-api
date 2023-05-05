import { Query, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClearUndefinedPipe } from '../../../../shared-kernel/pipe/clear-undefined.pipe';
import { ApiResponseDoc } from 'src/core/shared-kernel/rest/dto/api-response.dto';
import { ListTickersResponse } from '../../application/data/dto/response/list-tickers.response';
import { ListTickersRequest } from '../../application/data/dto/request/list-tickers.request';
import { ListTickersUseCase } from '../../application/usecase/list-tickers.usecase';
import { Ticker } from '../../application/data/ticker';

@Controller('ticker')
@ApiTags('Ticker')
export class TickerController {
  constructor(private readonly listTickersUseCase: ListTickersUseCase) {}

  // @Get()
  // @ApiResponseDoc(ListTickersResponse)
  // public async listTickers(
  //   @Query(ClearUndefinedPipe) criteria: ListTickersRequest,
  // ): Promise<Ticker[]> {
  //   return this.listTickersUseCase.execute(criteria);
  // }
}
