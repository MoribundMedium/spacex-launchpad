import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {LaunchpadInfo} from '../models';
import {SpacexLaunchpadApiDataSource} from '../datasources';

export interface SpacexLaunchpadApi {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  get(): Promise<LaunchpadInfo>;
}

export class SpacexLaunchpadApiProvider
  implements Provider<SpacexLaunchpadApi> {
  constructor(
    // TODO SpacexLaunchpadApi must match the name property in the datasource json file
    @inject('datasources.SpacexLaunchpadApi')
    protected dataSource: SpacexLaunchpadApiDataSource = new SpacexLaunchpadApiDataSource(),
  ) {}

  value(): Promise<SpacexLaunchpadApi> {
    return getService(this.dataSource);
  }
}
