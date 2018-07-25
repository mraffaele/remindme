export default interface IReminder {
  id: string;
  title: string;
  description: string;
  cron: string;
  autoRun: boolean;
  cycles: number;
  isRunning: boolean;
  audio: string;
  focusApp: boolean;
  autoHide: boolean;
}
