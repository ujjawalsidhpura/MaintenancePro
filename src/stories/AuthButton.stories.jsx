import AuthenticationButton from "../Components/Buttons/Auth-button";
import { MemoryRouter } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";

export default {
  title: 'Authentication Button',
  component: AuthenticationButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => 
<MemoryRouter>
  <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
  <AuthenticationButton {...args} />
</Auth0Provider>
</MemoryRouter>;

export const Authentication_Button = Template.bind({});