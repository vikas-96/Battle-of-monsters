import { RootState } from '../../app/store';

export const selectMonsters = (state: RootState) => state.monsters.monsters;

export const selectSelectedMonster = (state: RootState) =>
  state.monsters.selectedMonster;
export const selectedComputerMonster = (state: RootState) =>
  state.monsters.selectedComputerMonster;
export const battleResult = (state: RootState) => state.monsters.battleResult;
