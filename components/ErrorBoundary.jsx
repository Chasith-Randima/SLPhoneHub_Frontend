import React, { Component } from "react";
import Message from "./Message";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Message
          message={
            "Something Went wrong...Try reloading or going back to homepate.."
          }
          display={true}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
