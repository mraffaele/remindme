import React, { ReactNode } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AudioPlayer from "../components/AudioPlayer";
import { saveAudio, deleteAudio } from "../actions/UserAudioActions";
import importAudioFile from "../utils/importAudioFile";
import { IAppState, IUserAudioFile, ISystemAudioFile } from "../models";

interface IOwnProps {}
interface IDispatchProps {
  readonly save: (audio: IUserAudioFile) => void;
  readonly delete: (audio: IUserAudioFile) => void;
}
interface IStateProps {
  userAudio: IUserAudioFile[];
  systemAudio: ISystemAudioFile[];
}
type IProps = IOwnProps & IDispatchProps & IStateProps;

const AudioManager = (props: IProps) => {
  return (
    <div>
      <div>
        <h4 className="h4">User Audio </h4>
        <div className="audioManagerItems">
          {props.userAudio.length ? (
            props.userAudio.map((track: IUserAudioFile) => (
              <AudioPlayer
                key={track.id}
                className="audioManagerItem"
                controls={true}
                src={track}
                onDelete={() => props.delete(track)}
              />
            ))
          ) : (
            <div className="audioManagerItems">Click the `+` to upload your own audio.</div>
          )}
          <div className="audioManagerItems__add">
            <button className="btn btn--add" onClick={() => importAudioFile(props.save)} />
          </div>
        </div>
      </div>
      <div>
        <div className="audioManagerItems">
          <h4 className="h4">System Audio</h4>
          {props.systemAudio.map((track: ISystemAudioFile) => (
            <AudioPlayer className="audioManagerItem" key={track.id} controls={true} src={track} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    userAudio: state.userAudio,
    systemAudio: state.systemAudio
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ save: saveAudio, delete: deleteAudio }, dispatch);
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AudioManager);
