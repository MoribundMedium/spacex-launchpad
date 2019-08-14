import {Model, model, property} from '@loopback/repository';

@model({settings: {}})
export class LaunchpadInfo extends Model {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  full_name?: string;

  @property({
    type: 'string',
  })
  status?: string;

  constructor(data?: Partial<LaunchpadInfo>) {
    super(data);
  }
}

export interface LaunchpadInfoRelations {}

export type LaunchpadInfoWithRelations = LaunchpadInfo & LaunchpadInfoRelations;
