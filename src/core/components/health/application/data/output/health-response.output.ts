import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty()
  ok: boolean;

  constructor(isHealthy: boolean) {
    this.ok = isHealthy;
  }
}
