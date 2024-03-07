import { API_URL } from '../../constants/env';
import {
  BattleResult,
  Monster,
} from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());

const getBattleResult = async (
  playerMonster: Monster | null,
  computerMonster: Monster | null,
): Promise<BattleResult | null> =>
  await fetch(`${API_URL}/battle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      monster1Id: playerMonster?.id,
      monster2Id: computerMonster?.id,
    }),
  }).then((response) => response.json());

export const MonsterService = {
  getAll,
  getBattleResult,
};
