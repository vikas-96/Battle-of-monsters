import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import {
  fetchBattleResult,
  fetchMonstersData,
} from '../../reducers/monsters/monsters.actions';
import {
  battleResult,
  selectMonsters,
  selectSelectedMonster,
  selectedComputerMonster,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
  BattleResult,
} from './BattleOfMonsters.styled';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);
  const selectComputerMonster = useSelector(selectedComputerMonster);
  const result = useSelector(battleResult);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, []);

  const handleStartBattleClick = () => {
    // Fight!
    dispatch(
      fetchBattleResult({
        playerMonster: selectedMonster,
        computerMonster: selectComputerMonster,
      }),
    );
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />
      {result && selectedMonster && (
        <BattleResult>{result?.winner.name}</BattleResult>
      )}

      <BattleSection>
        <MonsterBattleCard
          title={selectedMonster?.name || 'Player'}
          monster={selectedMonster}></MonsterBattleCard>
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          title={selectComputerMonster?.name || 'Computer'}
          monster={selectComputerMonster}></MonsterBattleCard>
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
