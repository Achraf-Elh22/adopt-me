import { Component } from "react";

class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      active: 0,
    };
  }

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleClick = (event) => {
    this.setState({ active: +event.target.dataset.index });
  };

  render() {
    const { images } = this.props;
    const { active } = this.state;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, idx) => (
            // eslint-disable-next-line
            <img
              src={photo}
              key={photo}
              alt="animal"
              data-index={idx}
              className={active === idx ? "active" : ""}
              onClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
