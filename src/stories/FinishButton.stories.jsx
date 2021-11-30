import FinishButton from "../Components/Buttons/FinishButton";
import { MemoryRouter } from "react-router";

export default {
  title: 'Confirm Button',
  component: FinishButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => <MemoryRouter><FinishButton {...args} /></MemoryRouter>;

export const Confirm_Button = Template.bind({});