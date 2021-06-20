import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Carousel from "./Carousel";
import ErrorBoundaries from "./ErrorBoundaries";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = {
    loading: true,
    showModal: false,
  };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const data = await res.json();

    this.setState(Object.assign({ loading: false }, data.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>LOADING ....</h2>;
    }

    const {
      animal,
      breed,
      name,
      city,
      state,
      description,
      images,
      showModal,
    } = this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBundaries() {
  return (
    <ErrorBoundaries>
      <DetailsWithRouter />
    </ErrorBoundaries>
  );
}
