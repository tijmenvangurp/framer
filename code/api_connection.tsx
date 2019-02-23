import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import axios from "axios";

// For the best editing experience in VSCode, install Prettier
// https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

// Everything below is standard React. If you are new, start here:
// https://reactjs.org/docs/getting-started.html#learn-react
// https://reactjs.org/docs/components-and-props.html

// We can tell TypeScript to help us by defining our types
// https://www.typescriptlang.org/docs/handbook/basic-types.html
type Props = { text: string };

export class api_connection extends React.Component<Props> {
  // Return the component contents in JSX
  // https://reactjs.org/docs/introducing-jsx.html
  render() {
    return <div style={{}}>{this.state.name}</div>;
  }

  // Set default values for props if there are none
  // https://reactjs.org/docs/react-component.html#defaultprops
  static defaultProps: Props = {
    text: "Hello World!"
  };

  // Add Framer UI for this component (in the properties panel)
  // https://framer.com/learn/docs/components#code
  static propertyControls: PropertyControls<Props> = {
    text: { type: ControlType.String, title: "Text" }
  };

  state = {
    name: ""
  };

  componentDidMount() {
    let namesUrl = "https://listsdesign.herokuapp.com/lists/names-nl_NL.json";
    axios
      .get(`https://cors-anywhere.herokuapp.com/${namesUrl}`)
      .then(response => {
        const randomNumber = getRandomInt(100);
        const randomName =
          response.data["Names (Netherlands)"][randomNumber].data;
        this.setState({ name: randomName });
      });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Define some standard CSS for your component
// const style: React.CSSProperties = {
//   height: "100%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   textAlign: "center",
//   color: "#8855FF",
//   background: "rgba(136, 85, 255, 0.1)",
//   overflow: "hidden"
// };
