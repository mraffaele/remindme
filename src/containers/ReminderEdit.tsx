import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uniqid from "uniqid";
import { CronJob } from "Cron";
const { shell } = require("electron");

import {
  saveReminder,
  startReminder,
  stopReminder,
  deleteReminder
} from "../actions/ReminderActions";
import Switch from "../components/Switch";
import { IAppState, IUserAudioFile, ISystemAudioFile, IReminder } from "../models";
import AudioPlayer from "../components/AudioPlayer";

const emptyReminder = (): IReminder => {
  return {
    id: uniqid(),
    title: "",
    description: "",
    cron: "",
    autoRun: true,
    cycles: 0,
    isRunning: false,
    audio: null,
    focusApp: true,
    autoHide: true
  };
};

interface IOwnProps {
  readonly reminder?: IReminder;
  readonly onComplete?: () => void;
}
interface IDispatchProps {
  readonly stop: (reminder: IReminder) => void;
  readonly start: (reminder: IReminder) => void;
  readonly save: (reminder: IReminder) => void;
  readonly delete: (reminder: IReminder) => void;
}
interface IStateProps {
  userAudio: IUserAudioFile[];
  systemAudio: ISystemAudioFile[];
}
type IState = {
  reminder: IReminder;
  isCronValid: boolean;
};
type IProps = IOwnProps & IDispatchProps & IStateProps;

class ReminderEdit extends React.PureComponent<IProps, IState> {
  readonly state: IState = {
    reminder: this.props.reminder ? { ...this.props.reminder } : { ...emptyReminder() },
    isCronValid: false
  };

  get audioFiles(): any[] {
    return [].concat(this.props.userAudio, this.props.systemAudio);
  }

  get isTitleValid(): boolean {
    return this.state.reminder.title.trim().length > 0;
  }

  get isCronValid(): boolean {
    if (!this.state.reminder.cron) {
      return false;
    }

    try {
      new CronJob(this.state.reminder.cron, () => {});
      return true;
    } catch (ex) {
      return false;
    }
  }

  get isDescriptionValid(): boolean {
    return this.state.reminder.description.length < 80;
  }

  get isFormValid(): boolean {
    return this.isCronValid && this.isDescriptionValid && this.isTitleValid;
  }

  componentDidMount() {
    if (this.props.reminder && this.props.reminder.isRunning) {
      this.props.stop(this.props.reminder);
    }
  }

  componentWillReceiveProps() {
    if (this.props.reminder) {
      this.setState({
        reminder: { ...emptyReminder() }
      });
    }
  }

  handleSubmit(e): void {
    e.preventDefault();

    if (this.isFormValid) {
      let reminder: IReminder = { ...this.state.reminder };
      this.props.save(reminder);
      // this.props.start(reminder);
      this.props.onComplete && this.props.onComplete();
    }
  }

  render() {
    const reminder: IReminder = this.state.reminder;
    const { audio } = this.state.reminder;

    return (
      <div className="remEdit">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className={`form__field ${this.isTitleValid ? "" : "form__field--invalid"}`}>
            <label className="form__label">Title:</label>
            <input
              className="form__text"
              type="text"
              value={reminder.title}
              onChange={e => this.setState({ reminder: { ...reminder, title: e.target.value } })}
              maxLength={30}
            />
          </div>

          <div className={`form__field ${this.isCronValid ? "" : "form__field--invalid"}`}>
            <label className="form__label">Cron:</label>
            <div className="form__help">
              Need help with cron?{" "}
              <a
                onClick={() => {
                  shell.openExternal("https://crontab.guru/");
                }}
              >
                Click here
              </a>
            </div>
            <input
              className="form__text"
              type="text"
              value={reminder.cron}
              onChange={e => {
                this.setState({ reminder: { ...reminder, cron: e.target.value } });
              }}
            />
            <ul className={`cronSample`}>
              <li
                className={`cronSample__item`}
                onClick={() => {
                  this.setState({ reminder: { ...reminder, cron: "*/15 * * * *" } });
                }}
              >
                Every 15 mins
              </li>
              <li
                className={`cronSample__item`}
                onClick={() => {
                  this.setState({ reminder: { ...reminder, cron: "0 * * * *" } });
                }}
              >
                Every hour
              </li>
              <li
                className={`cronSample__item`}
                onClick={() => {
                  this.setState({ reminder: { ...reminder, cron: "30 12 * * 1-5" } });
                }}
              >
                12:30pm weekdays
              </li>
            </ul>
          </div>

          <div className={`form__field ${this.isDescriptionValid ? "" : "form__field--invalid"}`}>
            <label className="form__label">
              Description: <div className="form__help">80 chars max</div>
            </label>
            <textarea
              className="form__text"
              value={reminder.description}
              onChange={e =>
                this.setState({
                  reminder: {
                    ...reminder,
                    description: e.target.value.replace(/[^a-z0-9 .,]/gi, "")
                  }
                })
              }
            />
          </div>

          <div className={`form__field`}>
            <label className="form__label">Notification sound:</label>
            <div className={`form__radio ${!audio ? "form__radio--isActive" : ""}`}>
              <input
                className="form__radioBtn"
                name="audio"
                type="radio"
                value={""}
                checked={audio ? false : true}
                onChange={() => this.setState({ reminder: { ...reminder, audio: null } })}
              />
              None
            </div>

            {this.audioFiles.map((track, index) => {
              const isActive = audio === track.id;
              return (
                <div
                  key={index}
                  className={`form__radio ${isActive ? "form__radio--isActive" : ""}`}
                >
                  <input
                    className="form__radioBtn"
                    name="audio"
                    type="radio"
                    value={track.id}
                    checked={isActive}
                    onChange={() => this.setState({ reminder: { ...reminder, audio: track.id } })}
                  />
                  <AudioPlayer controls={false} src={track} trigger={isActive} />
                </div>
              );
            })}
          </div>
          <div className="form__field form__field--flex">
            <label className="form__label">
              Autorun:
              <div className="form__help">Start automatically on app start</div>
            </label>
            <Switch
              isChecked={reminder.autoRun}
              onChange={isChecked => {
                this.setState({ reminder: { ...reminder, autoRun: isChecked } });
              }}
            />
          </div>
          <div className="form__field form__field--flex">
            <label className="form__label">
              Focus Window:
              <div className="form__help">Bring app to front to notify</div>
            </label>
            <Switch
              isChecked={reminder.focusApp}
              onChange={isChecked => {
                this.setState({ reminder: { ...reminder, focusApp: isChecked } });
              }}
            />
          </div>
          <div className="form__field form__field--flex">
            <label className="form__label">
              Autohide Message:
              <div className="form__help">Hide 10 secs after notification</div>
            </label>
            <Switch
              isChecked={reminder.autoHide}
              onChange={isChecked => {
                this.setState({ reminder: { ...reminder, autoHide: isChecked } });
              }}
            />
          </div>
          <button className={`btn ${this.isFormValid ? "" : "btn--disabled"}`} type="submit">
            Save
          </button>
          {this.props.reminder && (
            <button
              className={`btn btn--text`}
              onClick={() => {
                this.props.delete(this.props.reminder);
                this.props.onComplete && this.props.onComplete();
              }}
            >
              Delete
            </button>
          )}
        </form>
      </div>
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
      save: saveReminder,
      start: startReminder,
      stop: stopReminder,
      delete: deleteReminder
    },
    dispatch
  );
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ReminderEdit);
