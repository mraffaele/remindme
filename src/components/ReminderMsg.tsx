import React from "react";
import { IReminder } from "../models";

interface IOwnProps {
  reminder: IReminder;
  onStop: Function;
  onContinue: Function;
  onHide: Function;
}

interface IOwnState {}

class ReminderMsg extends React.PureComponent<IOwnProps, IOwnState> {
  componentDidMount() {
    if (this.props.reminder.autoHide) {
      setTimeout(() => {
        this.props.onHide();
      }, 10000);
    }
  }

  render() {
    const { reminder, onStop, onContinue, onHide } = this.props;

    return (
      <div className="reminderMsg">
        <div>
          <h1 className="reminderMsg__title">
            {reminder.title}
            <span className="reminderMsg__cycles">{reminder.cycles}</span>
          </h1>
          <p className="reminderMsg__desc">{reminder.description}</p>
          <div className="controls">
            <button className="btn" onClick={() => onHide()}>
              Hide
            </button>

            <button className="btn btn--alt" onClick={() => onHide(true)}>
              Minimise App
            </button>

            <button className="btn  btn--text" onClick={() => onStop()}>
              Stop
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReminderMsg;
