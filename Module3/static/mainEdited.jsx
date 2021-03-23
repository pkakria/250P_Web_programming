function start() {

    class FigurePlace extends React.Component {
      constructor(props) {
        super(props);
        console.log("Figure component created");
      }
      title = this.props.title;
      img_source = this.props.src;
      imagenum = 0;
      titleStyle = { color : "black" }
      render() {
        return (
          <div>
            <button onClick={() => {
              this.imagenum = this.imagenum + 1;
              if (this.imagenum == 2){
                this.imagenum = 0;
              }
              this.img_source = "./images/image" + this.imagenum + ".jpg";
              this.setState({});
            }}>
            Next image
            </button>
            <figure>
            <img src ={this.img_source} width="100%"></img>
            </figure>
          </div>
        );
      }
    }
  
    ReactDOM.render(
      <div>
          <FigurePlace title={"View Course Pictures"} src={"./images/image0.jpg"}
          />
      </div>,
      document.getElementById("mainContainer")
    );
  
  }