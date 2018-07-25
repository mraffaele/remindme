import { IReminder } from "../models";

export enum ReminderActionTypes {
  START_REMINDER = "START_REMINDER",
  STOP_REMINDER = "STOP_REMINDER",
  INCREMENT_REMINDER = "INCREMENT_REMINDER",
  EDIT_REMINDER = "EDIT_REMINDER",
  SAVE_REMINDER = "SAVE_REMINDER",
  DELETE_REMINDER = "DELETE_REMINDER"
}

export enum AllReminderActionTypes {
  STOP_REMINDER_ALL = "STOP_REMINDER_ALL",
  START_REMINDER_ALL = "START_REMINDER_ALL"
}

export interface IReminderAction {
  type: ReminderActionTypes;
  payload: IReminder;
}

export interface IReminderActionAll {
  type: AllReminderActionTypes;
}

export function startReminder(reminder: IReminder): IReminderAction {
  return {
    type: ReminderActionTypes.START_REMINDER,
    payload: reminder
  };
}

export function stopReminder(reminder: IReminder): IReminderAction {
  console.log("stop");
  return {
    type: ReminderActionTypes.STOP_REMINDER,
    payload: reminder
  };
}

export function incrementReminderCycle(reminder: IReminder): IReminderAction {
  return {
    type: ReminderActionTypes.INCREMENT_REMINDER,
    payload: reminder
  };
}

export function editReminder(reminder): IReminderAction {
  return {
    type: ReminderActionTypes.EDIT_REMINDER,
    payload: reminder
  };
}

export function saveReminder(reminder: IReminder): IReminderAction {
  return {
    type: ReminderActionTypes.SAVE_REMINDER,
    payload: reminder
  };
}

export function deleteReminder(reminder: IReminder): IReminderAction {
  return {
    type: ReminderActionTypes.DELETE_REMINDER,
    payload: reminder
  };
}

export function stopAllReminders(): IReminderActionAll {
  return {
    type: AllReminderActionTypes.STOP_REMINDER_ALL
  };
}

export function startAllReminders(): IReminderActionAll {
  return {
    type: AllReminderActionTypes.START_REMINDER_ALL
  };
}
