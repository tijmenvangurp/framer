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
type Props = {
  text: string;
  textType: "countries" | "names" | "article";
  width: number;
  height: number;
  color: string;
  fontWeight: number;
  fontSize: number;
};

export class api_connection extends React.Component<Props> {
  // Return the component contents in JSX
  // https://reactjs.org/docs/introducing-jsx.html
  render() {
    let {
      text,
      textType,
      width,
      height,
      color,
      fontSize,
      fontWeight
    } = this.props;

    let { country, name, article } = this.state;
    switch (textType) {
      case "names":
        text = name;
        break;
      case "countries":
        text = country;
        break;
      case "article":
        text = article;
        break;

      default:
        break;
    }

    return (
      <div
        style={{
          width,
          color,
          fontSize,
          fontWeight,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "rgba(136, 85, 255, 0.1)"
        }}
      >
        {text}
      </div>
    );
  }

  // Set default values for props if there are none
  // https://reactjs.org/docs/react-component.html#defaultprops
  static defaultProps: Props = {
    text: "Hello World!",
    textType: "countries",
    width: 250,
    height: 100,
    color: "#000",
    fontWeight: 900,
    fontSize: 14
  };

  // Add Framer UI for this component (in the properties panel)
  // https://framer.com/learn/docs/components#code
  static propertyControls: PropertyControls<Props> = {
    textType: {
      type: ControlType.Enum,
      title: "Text type",
      options: ["countries", "names", "article"],
      optionTitles: ["Countries", "Names", "Article"]
    },
    fontSize: {
      type: ControlType.Number,
      title: "Font Size"
    },
    fontWeight: {
      type: ControlType.Number,
      min: 100,
      max: 900,
      step: 100,
      title: "Font weight"
    },
    color: {
      type: ControlType.Color,
      title: "Color"
    }
  };

  state = {
    name: "",
    country: "",
    article: ""
  };

  componentDidMount() {
    const namesUrl = "https://listsdesign.herokuapp.com/lists/names-nl_NL.json";
    const countriesUrl = "https://www.lists.design/lists/countries.json";
    const articleUrl = "https://www.lists.design/lists/articlesworld-en.json";

    // Name
    axios
      .get(`https://cors-anywhere.herokuapp.com/${namesUrl}`)
      .then(response => {
        const randomNumber = getRandomInt(100);
        const randomValue =
          response.data["Names (Netherlands)"][randomNumber].data;
        this.setState({ name: randomValue });
      });

    // Country
    axios
      .get(`https://cors-anywhere.herokuapp.com/${countriesUrl}`)
      .then(response => {
        const randomNumber = getRandomInt(100);

        const randomValue = response.data.Countries[randomNumber].data;
        this.setState({ country: randomValue });
      });

    // Article
    axios
      .get(`https://cors-anywhere.herokuapp.com/${articleUrl}`)
      .then(response => {
        const randomNumber = getRandomInt(4);
        const randomValue =
          response.data["Articles (World)"][randomNumber].data;
        this.setState({ article: randomValue });
      });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Define some standard CSS for your component
const style: React.CSSProperties = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  background: "rgba(136, 85, 255, 0.1)",
  overflow: "hidden"
};
