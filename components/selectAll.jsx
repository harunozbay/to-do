import * as React from "react";
import Svg, { Path } from "react-native-svg"
const SelectAll = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    {...props}
  >
    <Path d="M7 2C4.2 2 2 4.2 2 7v27c0 2.8 2.2 5 5 5h27c2.8 0 5-2.2 5-5V9.8L37 12v22c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h26.4l1.7-1.9c-.4 0-.7-.1-1.1-.1H7zm29.256 3.33L18.922 24.592l-8.258-7.34-1.328 1.496 9.742 8.66L37.744 6.67l-1.488-1.34zM41 11v2h2c1.7 0 3 1.3 3 3v27c0 1.7-1.3 3-3 3H16c-1.7 0-3-1.3-3-3v-2h-2v2c0 2.8 2.2 5 5 5h27c2.8 0 5-2.2 5-5V16c0-2.8-2.2-5-5-5h-2z" />
  </Svg>
);
export default SelectAll;
