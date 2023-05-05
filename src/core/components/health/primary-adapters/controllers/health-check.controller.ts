import { Controller, Get } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDoc } from '../../../../shared-kernel/rest/dto/api-response.dto';
import { HealthResponse } from '../../application/data/output/health-response.output';

@ApiTags('Health check')
@Controller('health')
export class HealthCheckController {
  @Get()
  @ApiResponseDoc(HealthResponse)
  @ApiInternalServerErrorResponse({ description: 'Internal error' })
  @ApiNotFoundResponse({ description: 'Not found' })
  isHealthy(): HealthResponse {
    return new HealthResponse(true);
  }
}
