import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

const server = app.listen();

beforeAll(() => jest.useFakeTimers());
afterAll(() => server.close());

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Battle', () => {
    test('should fail when trying a battle of monsters with an undefined monster', async () => {
      // @TODO
      const response = await request(server)
        .post('/battle')
        .send({ monster1Id: 'invalid', monster2Id: 'validId' });
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    test('should fail when trying a battle of monsters with an inexistent monster', async () => {
      // @TODO
      const response = await request(server)
        .post('/battle')
        .send({ monster1Id: 'noExistingId', monster2Id: 'validId' });
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    test('should insert a battle of monsters successfully with monster 1 winning', async () => {
      // @TODO
      const response = await request(server)
        .post('/battle')
        .send({ monster1Id: 1, monster2Id: 2 });
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toHaveProperty('winner');
      expect(response.body.winner).toBeDefined();
      expect(response.body.tie).toBe(false);
    });

    test('should insert a battle of monsters successfully with monster 2 winning', async () => {
      // @TODO
      const response = await request(server)
        .post('/battle')
        .send({ monster1Id: 2, monster2Id: 1 });
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toHaveProperty('winner');
      expect(response.body.winner).toBeDefined();
      expect(response.body.tie).toBe(false);
    });
  });
});
