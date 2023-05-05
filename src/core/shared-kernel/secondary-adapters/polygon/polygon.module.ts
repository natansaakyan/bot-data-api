import { Global, Module } from '@nestjs/common';
import { PolygonServiceInterfaceType } from '../../port/polygon.interface';
import { PolygonService } from './polygon.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: PolygonServiceInterfaceType,
      useClass: PolygonService,
    },
  ],
  exports: [PolygonServiceInterfaceType],
})
export class PolygonModule {}
