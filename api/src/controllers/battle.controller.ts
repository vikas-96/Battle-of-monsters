import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const winnerResult = async (req: Request, res: Response) => {
  const { monster1Id, monster2Id } = req.body;

  const [monster1, monster2] = await Monster.query().findByIds([
    monster1Id,
    monster2Id,
  ]);

  if (!monster1 || !monster2) {
    return res.status(400).json({ message: 'Invalid Id' });
  }

  let firstAttacker =
    monster1.speed > monster2.speed ||
    (monster1.speed === monster2.speed && monster1.attack > monster2.attack)
      ? monster1
      : monster2;
  let secondAttacker = firstAttacker === monster1 ? monster2 : monster1;

  while (monster1.hp > 0 && monster2.hp > 0) {
    const damage = Math.max(1, firstAttacker.attack - secondAttacker.defense);

    secondAttacker.hp -= damage;

    if (secondAttacker.hp <= 0) {
      await Battle.query().insert({
        monsterA: monster1,
        monsterB: monster2,
        winner: firstAttacker,
      });

      return res
        .status(StatusCodes.OK)
        .json({ winner: firstAttacker, tie: false });
    }
    [firstAttacker, secondAttacker] = [secondAttacker, firstAttacker];
  }
};

export const BattleController = {
  list,
  winnerResult,
};
