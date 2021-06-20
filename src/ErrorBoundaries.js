import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundaries extends Component {
  state = {
    hasError: false,
    redirect: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Something wrong happened", error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h2>
          Something Wrong happened. <Link to="/">Click here</Link> to go back to
          homepage or wait five minutes.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundaries;
