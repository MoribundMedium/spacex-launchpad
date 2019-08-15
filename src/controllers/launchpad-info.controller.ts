import {inject} from '@loopback/context';
import {get, param, HttpErrors} from '@loopback/rest';
import {SpacexLaunchpadApi} from '../services/spacex-launchpad-api.service';
import {LaunchpadInfo, LaunchpadInfoDto} from '../models';
import {HttpError} from 'http-errors';
const logger = require('../logger');

export class LaunchpadInfoController {
  constructor(
    @inject('services.SpacexLaunchpadApi')
    protected spacexLaunchpadApi: SpacexLaunchpadApi,
  ) {}

  @get('')
  async getLaunchpadInfo(
    @param.query.string('searchTerm') searchTerm: string,
  ): Promise<HttpError | LaunchpadInfoDto[]> {
    logger.info({
      methodName: 'getLaunchpadInfo',
      queryParams: searchTerm,
    });
    return this.spacexLaunchpadApi
      .get()
      .then(results =>
        mapLaunchpadInfoToDto(results).filter(
          filterLaunchpadsByTerm(searchTerm),
        ),
      )
      .catch(results => errorHandler(results, 'getLaunchpadInfo'));
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

// TODO: methodName can be omitted if we log the full call stack
function errorHandler(err: HttpError, methodName: string) {
  logger.error({
    error: err,
    methodName: methodName,
  });
  return new HttpErrors[503]();
}

function mapLaunchpadInfoToDto(launchpadInfoFromApi: void | LaunchpadInfo[]) {
  return launchpadInfoFromApi
    ? launchpadInfoFromApi.map(launchpad =>
        LaunchpadInfoDto.newInstanceFromApi(launchpad),
      )
    : [];
}
