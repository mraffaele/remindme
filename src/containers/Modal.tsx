import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IAppState, IModal, ModalTypes } from "../models";
import { closeModal } from "../actions/ModalActions";
import ReminderEdit from "./ReminderEdit";
import AudioManager from "./AudioManager";

interface IOwnProps {}
interface IDispatchProps {
  readonly close: () => void;
}
interface IStateProps {
  modal: IModal;
}
type IProps = IOwnProps & IDispatchProps & IStateProps;

const Modal = (props: IProps) => {
  const { isOpen, type, payload } = props.modal;

  return (
    <div className={`modal ${isOpen ? "modal--isOpen" : ""}`} onClick={() => props.close()}>
      <div className="modal__contentWrap" onClick={e => e.stopPropagation()}>
        <div className="modal__close" onClick={() => props.close()} />
        <div className="modal__content">
          {type === ModalTypes.ReminderEdit && (
            <div>
              <h1 className="modal__title">
                <span className="modal__subtitle">Reminder:</span>
                {payload ? payload.title : "Create New"}
              </h1>

              <ReminderEdit
                reminder={payload}
                onComplete={() => {
                  props.close();
                }}
              />
            </div>
          )}
          {type === ModalTypes.AudioManager && (
            <div>
              <h1 className="modal__title">
                <span className="modal__subtitle">Audio</span>
                Manager
              </h1>
              <AudioManager />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    modal: state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ close: closeModal }, dispatch);
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
