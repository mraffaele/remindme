import React from "react";
import { connect } from "react-redux";
import { CronJob } from "Cron";
const ipcRenderer = require("electron").ipcRenderer;
import {
  startReminder,
  stopReminder,
  incrementReminderCycle,
  deleteReminder
} from "../actions/ReminderActions";
import { editReminderModal } from "../actions/ModalActions";
import { bindActionCreators } from "redux";
import AudioPlayer from "../components/AudioPlayer";
import Switch from "../components/Switch";
import ReminderMsg from "../components/ReminderMsg";
import { IAppState, IUserAudioFile, ISystemAudioFile, IReminder } from "../models";

interface IOwnProps {
  readonly reminder: IReminder;
}
interface IDispatchProps {
  readonly start: (reminder: IReminder) => void;
  readonly stop: (reminder: IReminder) => void;
  readonly increment: (reminder: IReminder) => void;
  readonly delete: (reminder: IReminder) => void;
  readonly editReminder: (reminder: IReminder) => void;
}
interface IStateProps {
  userAudio: IUserAudioFile[];
  systemAudio: ISystemAudioFile[];
}

interface IState {
  showMessage: boolean;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class Reminder extends React.PureComponent<IProps, IState> {
  readonly state: IState = {
    showMessage: false
  };
  cron: any = null;

  get audio(): IUserAudioFile | ISystemAudioFile {
    const audio = []
      .concat(this.props.userAudio, this.props.systemAudio)
      .filter(track => track.id === this.props.reminder.audio);

    return audio.length ? audio[0] : null;
  }

  componentDidMount() {
    this.queue();
  }

  componentWillReceiveProps(props) {
    if (props.reminder.cron !== this.props.reminder.cron) {
      this.queue(props.reminder.cron);
    }

    if (props.reminder.isRunning !== this.props.reminder.isRunning) {
      if (props.reminder.isRunning) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  queue(cron = this.props.reminder.cron) {
    this.stop();
    this.cron = new CronJob(cron, this.onTick, this.onComplete, false, "Australia/Melbourne", this);

    if (this.props.reminder.autoRun) {
      this.props.start(this.props.reminder);
    }
  }

  onTick() {
    const { reminder, stop, increment } = this.props;
    increment(reminder);

    this.setState({ showMessage: true }, () => {
      if (reminder.focusApp) {
        ipcRenderer.send("notifyFocus");
      }
    });
  }

  onComplete(): void {}

  start(): void {
    if (this.cron) {
      this.cron.start();
    }
  }

  stop(): void {
    if (this.cron) {
      this.cron.stop();
    }
  }

  hideMessage(minimise: boolean = false) {
    this.setState({ showMessage: false });
    if (minimise) ipcRenderer.send("minimiseApp");
  }

  render() {
    const { reminder, start, stop } = this.props;
    const { title, isRunning, cycles } = reminder;

    return (
      <section className={`reminders__item ${isRunning ? "reminders__item--isRunning" : ""}`}>
        {this.state.showMessage && (
          <ReminderMsg
            reminder={reminder}
            onContinue={() => {
              this.hideMessage();
              start(reminder);
            }}
            onStop={() => {
              this.hideMessage();
              stop(reminder);
            }}
            onHide={(minimise: boolean) => this.hideMessage(minimise)}
          />
        )}
        <div className="reminders__content" onClick={e => e.stopPropagation()}>
          <div className="reminders__basicInfo">
            <h1
              className="reminders__title"
              onClick={() => {
                this.props.editReminder(reminder);
              }}
            >
              {title}
              <span className="reminders__edit">Edit</span>
            </h1>
          </div>

          <Switch
            isChecked={isRunning}
            onChange={isChecked => {
              isChecked ? this.props.start(reminder) : this.props.stop(reminder);
            }}
          />
        </div>

        {this.audio && (
          <AudioPlayer
            className="reminders__audio"
            controls={false}
            src={this.audio}
            trigger={cycles}
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    userAudio: state.userAudio,
    systemAudio: state.systemAudio
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increment: incrementReminderCycle,
      start: startReminder,
      stop: stopReminder,
      delete: deleteReminder,
      editReminder: editReminderModal
    },
    dispatch
  );
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Reminder);
