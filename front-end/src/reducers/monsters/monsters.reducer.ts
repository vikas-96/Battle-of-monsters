import { createReducer } from '@reduxjs/toolkit';
import {
  BattleResult,
  Monster,
} from '../../models/interfaces/monster.interface';
import {
  fetchMonstersData,
  setSelectedMonster,
  fetchBattleResult,
  setSelectedComputerMonster,
} from './monsters.actions';

interface MonsterState {
  monsters: Monster[];
  selectedMonster: Monster | null;
  selectedComputerMonster: Monster | null;
  battleResult: BattleResult | null;
}

const initialState: MonsterState = {
  monsters: [],
  selectedMonster: null,
  selectedComputerMonster: null,
  battleResult: null,
};

export const monstersReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMonstersData.pending, (state) => ({
    ...state,
    monsters: [],
  }));
  builder.addCase(fetchMonstersData.rejected, (state) => ({
    ...state,
    monsters: [],
  }));
  builder.addCase(fetchMonstersData.fulfilled, (state, action) => ({
    ...state,
    monsters: action.payload,
  }));

  builder.addCase(fetchBattleResult.pending, (state) => ({
    ...state,
    battleResult: null,
  }));

  builder.addCase(fetchBattleResult.rejected, (state) => ({
    ...state,
    battleResult: null,
  }));

  builder.addCase(fetchBattleResult.fulfilled, (state, action) => ({
    ...state,
    battleResult: action.payload,
  }));

  builder.addCase(setSelectedMonster, (state, action) => ({
    ...state,
    selectedMonster: action.payload,
    battleResult: null,
  }));

  builder.addCase(setSelectedComputerMonster, (state, action) => ({
    ...state,
    selectedComputerMonster: action.payload,
  }));
});
