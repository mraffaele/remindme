import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const { ipcRenderer } = require("electron");
import { IAppState, IReminder } from "../models";
import { editReminderModal, audioManagerModal, closeModal } from "../actions/ModalActions";
import { startAllReminders, stopAllReminders } from "../actions/ReminderActions";

interface IOwnProps {}
interface IDispatchProps {
  readonly editReminderModal: (reminder: IReminder) => void;
  readonly audioManagerModal: () => void;
  readonly startAllReminders: () => void;
  readonly stopAllReminders: () => void;
  readonly closeModal: () => void;
}
interface IStateProps {
  readonly modalIsOpen: boolean;
}
type IProps = IOwnProps & IDispatchProps & IStateProps;

class MenuController extends React.PureComponent<IProps> {
  componentDidMount() {
    const {
      editReminderModal,
      startAllReminders,
      stopAllReminders,
      audioManagerModal
    } = this.props;
    ipcRenderer.on("NewReminder", () => editReminderModal(null));
    ipcRenderer.on("BatchStart", () => !this.props.modalIsOpen && startAllReminders());
    ipcRenderer.on("BatchStop", () => !this.props.modalIsOpen && stopAllReminders());
    ipcRenderer.on("AudioManager", () => audioManagerModal());
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    modalIsOpen: state.modal.isOpen
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { editReminderModal, audioManagerModal, startAllReminders, stopAllReminders, closeModal },
    dispatch
  );
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(MenuController);
audioManagerModal;
