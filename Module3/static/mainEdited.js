function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function start() {
  class FigurePlace extends React.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "title", this.props.title);

      _defineProperty(this, "img_source", this.props.src);

      _defineProperty(this, "imagenum", 0);

      _defineProperty(this, "titleStyle", {
        color: "black"
      });

      console.log("Figure component created");
    }

    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          this.imagenum = this.imagenum + 1;

          if (this.imagenum == 2) {
            this.imagenum = 0;
          }

          this.img_source = "./images/image" + this.imagenum + ".jpg";
          this.setState({});
        }
      }, "Next image"), /*#__PURE__*/React.createElement("h2", {
        style: this.titleStyle
      }, this.title), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("img", {
        src: this.img_source,
        width: "100%"
      })));
    }

  }

  ReactDOM.render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FigurePlace, {
    title: "View Course Pictures",
    src: "./images/image0.jpg"
  })), document.getElementById("mainContainer"));
}
