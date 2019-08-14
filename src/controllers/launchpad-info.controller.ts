import {inject} from '@loopback/context';
import {get, HttpErrors, param} from '@loopback/rest';
import {SpacexLaunchpadApi} from '../services/spacex-launchpad-api.service';
import {LaunchpadInfo, LaunchpadInfoDto} from '../models';
const logger = require('../logger');

export class LaunchpadInfoController {
  constructor(
    @inject('services.SpacexLaunchpadApi')
    protected spacexLaunchpadApi: SpacexLaunchpadApi,
  ) {}

  @get('')
  async getLaunchpadInfo(
    @param.query.string('searchTerm') searchTerm: string,
  ): Promise<void | LaunchpadInfoDto[]> {
    return this.spacexLaunchpadApi
      .get()
      .then(results =>
        mapLaunchpadInfoToDto(results).filter(
          filterLaunchpadsByTerm(searchTerm),
        ),
      )
      .catch(results => errorHandler(results));
  }
}

function filterLaunchpadsByTerm(searchTerm: string) {
  return function(launchpad: LaunchpadInfoDto) {
    return (
      (launchpad.name &&
        launchpad.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (launchpad.status &&
        launchpad.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };
}

function errorHandler(err: Error) {
  // TODO implement more error handling
  logger.error('uh oh!!!');
  throw new HttpErrors[503](); // unhandled error, make sure it returns back to user?
}

function mapLaunchpadInfoToDto(launchpadInfoFromApi: void | LaunchpadInfo[]) {
  return launchpadInfoFromApi
    ? launchpadInfoFromApi.map(val => LaunchpadInfoDto.newInstanceFromApi(val))
    : [];
}
