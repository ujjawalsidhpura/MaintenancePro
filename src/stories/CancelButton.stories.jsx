import CancelButton from "../Components/Buttons/CancelButton";
import { MemoryRouter } from "react-router";

export default {
  title: 'Cancel Button',
  component: CancelButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { onClick: { action: 'clicked' } }
};

const Template = (args) => <MemoryRouter><CancelButton {...args} /></MemoryRouter>;

export const Cancel_Button = Template.bind({});