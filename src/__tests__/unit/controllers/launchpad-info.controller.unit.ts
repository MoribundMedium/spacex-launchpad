import {expect, sinon} from '@loopback/testlab';
import {LaunchpadInfoController} from '../../../controllers';
import {SpacexLaunchpadApi} from '../../../services';
import {LaunchpadInfo, LaunchpadInfoDto} from '../../../models';
import {HttpErrors} from '@loopback/rest';

const launchpadTestData = [
  new LaunchpadInfo({
    id: 'kwajalein_atoll',
    full_name: 'Kwajalein Atoll Omelek Island', // eslint-disable-line
    status: 'retired',
  }),
  new LaunchpadInfo({
    id: 'ccafs_slc_40',
    full_name: 'Cape Canaveral Air Force Station Space Launch Complex 40', // eslint-disable-line
    status: 'active',
  }),
  new LaunchpadInfo({
    id: 'ksc_lc_39a',
    full_name: 'Kennedy Space Center Historic Launch Complex 39A', // eslint-disable-line
    status: 'active',
  }),
  new LaunchpadInfo({
    id: 'vafb_slc_3w',
    full_name: 'Vandenberg Air Force Base Space Launch Complex 3W', // eslint-disable-line
    status: 'retired',
  }),
  new LaunchpadInfo({
    id: 'vafb_slc_4e',
    full_name: 'Vandenberg Air Force Base Space Launch Complex 4E', // eslint-disable-line
    status: 'active',
  }),
  new LaunchpadInfo({
    id: 'stls',
    full_name: 'SpaceX South Texas Launch Site', // eslint-disable-line
    status: 'under construction',
  }),
];

describe('LaunchpadInfoController ', () => {
  let spacexService: SpacexLaunchpadApi;
  let spacexServiceStub: sinon.SinonStub;

  beforeEach(givenMockSpacexService);

  describe('getLaunchpadInfo(searchTerm: string)', () => {
    it('returns a full list of launchpad info when given an empty searchTerm', async () => {
      const launchpadDtoTestData = launchpadTestData.map(launchpad =>
        LaunchpadInfoDto.newInstanceFromApi(launchpad),
      );
      const controller = new LaunchpadInfoController(spacexService);
      spacexServiceStub.resolves(launchpadTestData);

      const details = await controller.getLaunchpadInfo('');

      sinon.assert.calledOnce(spacexServiceStub);
      sinon.assert.pass(spacexServiceStub.returned(launchpadTestData));
      expect(details).to.eql(launchpadDtoTestData);
    });

    it('returns a list of launchpad info filtered by name when given an all-lower-case searchTerm', async () => {
      const filteredLaunchpadTestData = [
        launchpadTestData[1],
        launchpadTestData[3],
        launchpadTestData[4],
      ];
      const filteredLaunchpadDtoTestData = filteredLaunchpadTestData.map(
        launchpad => LaunchpadInfoDto.newInstanceFromApi(launchpad),
      );
      const controller = new LaunchpadInfoController(spacexService);
      spacexServiceStub.resolves(launchpadTestData);

      const details = await controller.getLaunchpadInfo('air');

      sinon.assert.calledOnce(spacexServiceStub);
      sinon.assert.pass(spacexServiceStub.returned(launchpadTestData));
      expect(details).to.eql(filteredLaunchpadDtoTestData);
    });

    it('returns a list of launchpad info filtered by name when given an all-upper-case searchTerm', async () => {
      const filteredLaunchpadTestData = [
        launchpadTestData[1],
        launchpadTestData[3],
        launchpadTestData[4],
      ];
      const filteredLaunchpadDtoTestData = filteredLaunchpadTestData.map(
        launchpad => LaunchpadInfoDto.newInstanceFromApi(launchpad),
      );
      const controller = new LaunchpadInfoController(spacexService);
      spacexServiceStub.resolves(launchpadTestData);

      const details = await controller.getLaunchpadInfo('AIR');

      sinon.assert.calledOnce(spacexServiceStub);
      sinon.assert.pass(spacexServiceStub.returned(launchpadTestData));
      expect(details).to.eql(filteredLaunchpadDtoTestData);
    });

    it('returns a list of launchpad info filtered by status when given a all-lower-case searchTerm', async () => {
      const filteredLaunchpadTestData = [
        launchpadTestData[1],
        launchpadTestData[2],
        launchpadTestData[4],
      ];
      const filteredLaunchpadDtoTestData = filteredLaunchpadTestData.map(
        launchpad => LaunchpadInfoDto.newInstanceFromApi(launchpad),
      );
      const controller = new LaunchpadInfoController(spacexService);
      spacexServiceStub.resolves(launchpadTestData);

      const details = await controller.getLaunchpadInfo('active');

      sinon.assert.calledOnce(spacexServiceStub);
      sinon.assert.pass(spacexServiceStub.returned(launchpadTestData));
      expect(details).to.eql(filteredLaunchpadDtoTestData);
    });

    it('returns a list of launchpad info filtered by status when given an all-upper-case searchTerm', async () => {
      const filteredLaunchpadTestData = [launchpadTestData[5]];
      const filteredLaunchpadDtoTestData = filteredLaunchpadTestData.map(
        launchpad => LaunchpadInfoDto.newInstanceFromApi(launchpad),
      );
      const controller = new LaunchpadInfoController(spacexService);
      spacexServiceStub.resolves(launchpadTestData);

      const details = await controller.getLaunchpadInfo('under construction');

      sinon.assert.calledOnce(spacexServiceStub);
      sinon.assert.pass(spacexServiceStub.returned(launchpadTestData));
      expect(details).to.eql(filteredLaunchpadDtoTestData);
    });

    it('returns zero launchpad info when given a searchTerm with no matches', async () => {
      const filteredLaunchpadTestData: any[] = []; // eslint-disable-line
      const filteredLaunchpadDtoTestData = filteredLaunchpadTestData.map(
        launchpad => LaunchpadInfoDto.newInstanceFromApi(launchpad),
      );
      const controller = new LaunchpadInfoController(spacexService);
      spacexServiceStub.resolves(launchpadTestData);

      const details = await controller.getLaunchpadInfo('asdfghjkl!!!');

      sinon.assert.calledOnce(spacexServiceStub);
      sinon.assert.pass(spacexServiceStub.returned(launchpadTestData));
      expect(details).to.eql(filteredLaunchpadDtoTestData);
    });

    it('returns a 503 Service Unavailable error if the SpaceX API is unavailable', async () => {
      const controller = new LaunchpadInfoController(spacexService);
      spacexServiceStub.rejects();

      const details = await controller.getLaunchpadInfo('');

      sinon.assert.calledOnce(spacexServiceStub);
      sinon.assert.pass(spacexServiceStub.threw());
      expect(details).to.eql(new HttpErrors[503]());
    });
  });

  function givenMockSpacexService() {
    spacexService = {get: sinon.stub()};
    spacexServiceStub = spacexService.get as sinon.SinonStub;
  }
});
