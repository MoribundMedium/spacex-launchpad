import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './spacex-launchpad-api.datasource.json';

export class SpacexLaunchpadApiDataSource extends juggler.DataSource {
  static dataSourceName = 'SpacexLaunchpadApi';

  constructor(
    @inject('datasources.config.SpacexLaunchpadApi', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
