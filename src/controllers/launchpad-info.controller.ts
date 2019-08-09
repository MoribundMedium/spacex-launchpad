import {inject} from '@loopback/context';
import {get, param} from '@loopback/rest';
import {SpacexLaunchpadApi} from '../services/spacex-launchpad-api.service';
import {LaunchpadInfo} from '../models';

export class LaunchpadInfoController {
  constructor(
    @inject('services.SpacexLaunchpadApi')
    protected spacexLaunchpadApi: SpacexLaunchpadApi,
  ) {}

  @get('')
  async getLaunchpadInfo(): Promise<LaunchpadInfo> {
    // TODO add parameters like: @param.path.integer('intA') intA: number
    return await this.spacexLaunchpadApi.get();
  }
}
