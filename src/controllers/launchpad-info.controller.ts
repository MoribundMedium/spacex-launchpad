import {inject} from '@loopback/context';
import {get, param, HttpErrors} from '@loopback/rest';
import {SpacexLaunchpadApi} from '../services/spacex-launchpad-api.service';
import {LaunchpadInfo, LaunchpadInfoDto} from '../models';
const logger = require('../logger');

export class LaunchpadInfoController {
  constructor(
    @inject('services.SpacexLaunchpadApi')
    protected spacexLaunchpadApi: SpacexLaunchpadApi,
  ) {}

  @get('')
  async getLaunchpadInfo(): Promise<void | LaunchpadInfoDto[]> {
    // TODO add parameters like: @param.path.integer('intA') intA: number
    return await this.spacexLaunchpadApi
      .get()
      .then(results => mapLaunchpadInfoToDto(results))
      .catch(results => errorHandler(results));
  }
}

function errorHandler(err: Error) {
  // TODO implement more error handling
  logger.error('uh oh!!!');
  throw new HttpErrors[503](); // "unhandled error, make sure it back to user?"
}

function mapLaunchpadInfoToDto(launchpadInfoFromApi: void | LaunchpadInfo[]) {
  return launchpadInfoFromApi
    ? launchpadInfoFromApi.map(val => LaunchpadInfoDto.newInstanceFromApi(val))
    : [];
}
