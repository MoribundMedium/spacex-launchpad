import {expect} from '@loopback/testlab';
import {LaunchpadInfo, LaunchpadInfoDto} from '../../../models';

const launchpadInfoTestData = new LaunchpadInfo({
  id: 'kwajalein_atoll',
  full_name: 'Kwajalein Atoll Omelek Island', // eslint-disable-line
  status: 'retired',
});

const launchpadInfoDtoResultData = new LaunchpadInfoDto({
  id: 'kwajalein_atoll',
  name: 'Kwajalein Atoll Omelek Island',
  status: 'retired',
});

describe('LaunchpadInfoDtoModel ', () => {
  describe('newInstanceFromApi(launchpadInfo: LaunchpadInfo)', () => {
    it('returns a LaunchpadInfo DTO with the correct properties mapped from the API model', async () => {
      const launchpadDtoTestData = LaunchpadInfoDto.newInstanceFromApi(
        launchpadInfoTestData,
      );

      expect(launchpadDtoTestData).to.eql(launchpadInfoDtoResultData);
    });
  });
});
