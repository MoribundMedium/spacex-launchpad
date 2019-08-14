import {Model, model, property} from '@loopback/repository';
import {LaunchpadInfo} from './launchpad-info.model';

@model({settings: {}})
export class LaunchpadInfoDto extends Model {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  status?: string;

  // Constructs new DTO model from datasource model
  static newInstanceFromApi(launchpadInfo: LaunchpadInfo) {
    return new this({
      id: launchpadInfo.id,
      name: launchpadInfo.full_name,
      status: launchpadInfo.status,
    });
  }

  constructor(data?: Partial<LaunchpadInfoDto>) {
    super(data);
  }
}

export interface LaunchpadInfoDtoRelations {}

export type LaunchpadInfoDtoWithRelations = LaunchpadInfoDto &
  LaunchpadInfoDtoRelations;
