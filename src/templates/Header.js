import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/LoginActions';
import { Header, Button } from 'registers-react-library';

const HeaderModule = (props) => {
  return (
    <Header
      showHeaderItems={props.data.loggedIn}
      headerLinks={[
        { text: 'User Details', link: '/UserDetails' },
        { text: 'Information', link: '/TechnicalInformation' },
      ]}
      imageUrl="/Home"
    >
      <Button
        id="logoutButton"
        size="thin"
        text="Logout"
        onClick={!props.data.currentlySending ? () => props.dispatch(logout()) : null}
        ariaLabel="Logout Button"
        type="submit"
        loading={props.data.currentlySending}
      />
    </Header>
  );
};

function select(state) {
  return {
    data: state.login,
  };
}

export default connect(select)(HeaderModule);
