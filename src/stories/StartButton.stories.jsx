import StartButton from "../Components/Buttons/StartButton";
import { MemoryRouter } from "react-router";

export default {
  title: 'Start Button',
  component: StartButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => <MemoryRouter><StartButton {...args} /></MemoryRouter>;

export const Start_Button = Template.bind({});


