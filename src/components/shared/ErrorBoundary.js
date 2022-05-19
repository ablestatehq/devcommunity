import { Component } from "react";


export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error.toString() };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center my-5">
          <div className="flex flex-col space-y-2 items-center bg-red-300 max-w-2xl p-5 rounded-sm">
            <h1>something went wrong!</h1>
            <span>{JSON.stringify(this.state)}</span>
            <button className="bg-blue-600 text-white font-bold p-2 rounded-md self-end" onClick={() => this.handleReset()}>Reset</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
