import {expect, sinon} from '@loopback/testlab';
import {LaunchpadInfoController} from '../../../controllers';
import {SpacexLaunchpadApi} from '../../../services';

describe('ProductController (unit)', () => {
  let spacexService: SpacexLaunchpadApi;
  let spacexServiceStub: sinon.SinonStub;

  beforeEach(givenMockSpacexService);

  describe('getDetails()', () => {
    it('retrieves details of a product', async () => {
      const controller = new LaunchpadInfoController(spacexService);
      spacexServiceStub.resolves([]);

      const details = await controller.getLaunchpadInfo('air');

      expect(details).to.eql([]);
      sinon.assert.calledOnce(spacexServiceStub);
      sinon.assert.pass(spacexServiceStub.calledOnce);
      sinon.assert.pass(spacexServiceStub.returned([]));
    });
  });

  function givenMockSpacexService() {
    spacexService = {get: sinon.stub()};
    spacexServiceStub = spacexService.get as sinon.SinonStub;
  }
});
