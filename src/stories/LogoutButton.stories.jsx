import LogoutButton from "../Components/Buttons/Logout-button";
import { MemoryRouter } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";

export default {
  title: 'Logout Button',
  component: LogoutButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => 
<MemoryRouter>
<Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
<LogoutButton {...args} />
</Auth0Provider>
</MemoryRouter>;

export const Logout_Button = Template.bind({});