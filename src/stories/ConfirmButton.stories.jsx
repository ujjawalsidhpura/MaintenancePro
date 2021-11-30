import ConfirmButton from "../Components/Buttons/ConfirmButton";
import { MemoryRouter } from "react-router";

export default {
  title: 'Confirm Button',
  component: ConfirmButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => <MemoryRouter><ConfirmButton {...args} /></MemoryRouter>;

export const Confirm_Button = Template.bind({});