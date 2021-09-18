import React, { Component } from 'react';
import { Segment, Confirm, Header, Divider } from 'semantic-ui-react';

interface Props {
  open: boolean;
  openFunc: Function;
}

class LogoutConfirm extends Component<Props> {
  close = () => {
    this.props.openFunc(false);
  };

  render() {
    return (
      <>
        <Confirm
          className="LogoutConfirm"
          open={this.props.open}
          cancelButton="No"
          confirmButton="Yes"
          content={
            <Segment placeholder>
              <Header as="h4" icon>
                Log Out
                <Header.Subheader>Are you sure?</Header.Subheader>
              </Header>
              <Divider clearing />
            </Segment>
          }
          onCancel={this.close}
          // onConfirm={auth.logout}
        />
      </>
    );
  }
}

export default LogoutConfirm;
