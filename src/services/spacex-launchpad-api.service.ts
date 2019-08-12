import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {SpacexLaunchpadApiDataSource} from '../datasources';
import {LaunchpadInfo} from '../models';

export interface SpacexLaunchpadApi {
  get(): Promise<LaunchpadInfo[]>;
}

export class SpacexLaunchpadApiProvider
  implements Provider<SpacexLaunchpadApi> {
  constructor(
    @inject('datasources.SpacexLaunchpadApi')
    protected dataSource: SpacexLaunchpadApiDataSource = new SpacexLaunchpadApiDataSource(),
  ) {}

  value(): Promise<SpacexLaunchpadApi> {
    return getService(this.dataSource);
  }
}
