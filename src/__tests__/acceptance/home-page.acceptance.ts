import {Client} from '@loopback/testlab';
import {SpacexLaunchpadApplication} from '../..';
import {setupApplication} from './test-helper';

describe('HomePage', () => {
  let app: SpacexLaunchpadApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes self-hosted explorer', async () => {
    await client
      .get('/explorer/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/);
  });
});
