import { ApiProperty } from '@nestjs/swagger';
import { Fillable } from '../../common/fillable.decorator';

export class StatusResponse {
  @ApiProperty()
  status: boolean;

  @Fillable
  public static fromObject(_obj: StatusResponse): StatusResponse {
    return new StatusResponse();
  }

  public static ok(): StatusResponse {
    const model = new StatusResponse();
    model.status = true;
    return model;
  }

  public static fail(): StatusResponse {
    const model = new StatusResponse();
    model.status = false;
    return model;
  }
}
