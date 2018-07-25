import { IReminder } from "../models";

export const RemindersReducer = (state: IReminder[] = [], action): IReminder[] => {
  switch (action.type) {
    case "START_REMINDER":
      return state.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, isRunning: true };
        }
        return item;
      });

    case "STOP_REMINDER":
      return state.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, isRunning: false };
        }
        return item;
      });

    case "INCREMENT_REMINDER":
      return state.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, cycles: action.payload.cycles + 1 };
        }
        return item;
      });

    case "SAVE_REMINDER":
      const isNew = !state.filter(item => item.id === action.payload.id).length;
      if (isNew) {
        let updated = state.slice(0);
        updated.push(action.payload);
        return updated;
      }

      return state.map(item => {
        if (item.id === action.payload.id) {
          return { ...action.payload, cycles: item.cycles };
        }
        return item;
      });

    case "DELETE_REMINDER":
      return state.filter(item => item.id !== action.payload.id);

    case "START_REMINDER_ALL":
      return state.map(item => {
        return { ...item, isRunning: true };
      });

    case "STOP_REMINDER_ALL":
      return state.map(item => {
        return { ...item, isRunning: false };
      });
  }

  return state;
};
