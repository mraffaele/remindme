import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IAppState, IReminder } from "../models";
import Reminder from "./Reminder";
import { editReminderModal } from "../actions/ModalActions";

interface IOwnProps {}
interface IDispatchProps {
  readonly create: (reminder: IReminder) => void;
}
interface IStateProps {
  reminders: IReminder[];
}
type IProps = IOwnProps & IDispatchProps & IStateProps;

const ReminderList = (props: IProps) => {
  const { reminders, create } = props;

  return (
    <div className="reminders">
      {reminders.length ? (
        reminders.map((reminder: IReminder) => <Reminder key={reminder.id} reminder={reminder} />)
      ) : (
        <div className="reminders__empty" onClick={() => create(null)}>
          <button className="btn">Create a Reminder</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    reminders: state.reminders
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ create: editReminderModal }, dispatch);
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ReminderList);
