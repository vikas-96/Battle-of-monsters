import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
  Image,
  Line,
  MonsterProps,
  ProgressBar,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monster }) => {
  return (
    <>
      {!monster ? (
        <BattleMonsterCard centralized>
          <BattleMonsterTitle>{title!}</BattleMonsterTitle>
        </BattleMonsterCard>
      ) : (
        <BattleMonsterCard>
          <Image src={monster?.imageUrl} />
          <BattleMonsterTitle>{title!}</BattleMonsterTitle>
          <Line />
          <MonsterProps>HP</MonsterProps>
          <ProgressBar variant="determinate" value={monster?.hp} />
          <MonsterProps>Attack</MonsterProps>
          <ProgressBar variant="determinate" value={monster?.attack} />
          <MonsterProps>defense</MonsterProps>
          <ProgressBar variant="determinate" value={monster?.defense} />
          <MonsterProps>Speed</MonsterProps>
          <ProgressBar variant="determinate" value={monster?.speed} />
        </BattleMonsterCard>
      )}
    </>
  );
};

export { MonsterBattleCard };
