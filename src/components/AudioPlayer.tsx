import React from "react";
import { IUserAudioFile, ISystemAudioFile } from "../models";

interface IOwnProps {
  src: IUserAudioFile | ISystemAudioFile;
  onDelete?: Function;
  className?: string;
  trigger?: any;
  controls: boolean;
}

interface IOwnState {
  isPlaying: boolean;
}

class AudioPlayer extends React.PureComponent<IOwnProps, IOwnState> {
  readonly state = {
    isPlaying: false
  };

  componentWillReceiveProps(props) {
    if (props.trigger !== this.props.trigger && props.trigger) {
      this.play();
    }
  }

  play(): void {
    const audio: any = this.refs.audio;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      this.setState({ isPlaying: true });
    }
  }

  stop(): void {
    const audio: any = this.refs.audio;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      this.setState({ isPlaying: false });
    }
  }

  render() {
    const className = this.props.className || "audio";
    let fileName = this.props.src.fileName;
    if (fileName.length > 20) {
      fileName = `... ${fileName.substr(fileName.length - 20)}`;
    }
    return (
      <div className={`${className}`}>
        <h5 className={`${className}__name`}>{fileName}</h5>

        <audio
          ref="audio"
          src={this.props.src.data}
          onEnded={() => {
            this.setState({ isPlaying: false });
          }}
          style={{ display: "none" }}
        />
        {this.props.onDelete && this.props.controls ? (
          <button className="btn btn--delete" onClick={() => this.props.onDelete()} />
        ) : null}
        {this.props.controls ? (
          <button
            className={`btn btn--play ${this.state.isPlaying ? "btn--stop" : ""}`}
            onClick={() => (this.state.isPlaying ? this.stop() : this.play())}
          />
        ) : null}
      </div>
    );
  }
}

export default AudioPlayer;
