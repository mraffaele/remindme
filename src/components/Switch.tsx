import React from "react";

interface IProps {
  isChecked?: boolean;
  onChange?: Function;
}

interface IState {
  isChecked: boolean;
}
class Switch extends React.PureComponent<IProps, IState> {
  readonly state = {
    isChecked: this.props.isChecked || false
  };

  componentWillReceiveProps(props: IProps) {
    if (props.isChecked !== this.state.isChecked) {
      this.setState({ isChecked: props.isChecked });
    }
  }

  render() {
    const { isChecked } = this.state;

    return (
      <div className="switch">
        <input
          className="switch__checkbox"
          type="checkbox"
          checked={isChecked}
          onClick={(e): void => e.stopPropagation()}
          onChange={(e): void => {
            this.setState({ isChecked: !isChecked }, () => {
              this.props.onChange && this.props.onChange(!isChecked);
            });
          }}
        />
        <div className="switch__label" />
      </div>
    );
  }
}

export default Switch;
