import axios from "axios";
import React, { Component } from "react";

class Monitors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      isListEmpty: false,
    };
  }

  async getMonitorInfo() {
    try {
      const res = await axios.get("http://localhost:8080/monitors");
      this.setState({ info: res.data }); // remove json if issue
      if (this.state.info != null) {
        this.setState({ isListEmpty: true });
      }
      console.log(this.state.info);
    } catch {
      console.log("error from get");
    }
  }

  componentDidMount() {
    this.getMonitorInfo();
  }

  deleteMonitorInfo(id) {
    axios.delete("http://localhost:8080/monitors/" + id).then((response) => {
      if (response.data != null) {
        alert("Monitor deleted.");
        this.setState({
          info: this.state.info.filter((monitor) => monitor.id !== id),
        });
        this.getMonitorInfo();
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Monitors</h1>

        <div id="table">
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Description</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.info.length === 0 ? (
                <tr align="center">
                  <td colspan="6">No Monitors available...</td>
                </tr>
              ) : (
                this.state.info.map((monitor) => {
                  return (
                    <tr>
                      <td>{monitor.model}</td>
                      <td>{monitor.manufacturer}</td>
                      <td>{monitor.description}</td>
                      <td>{monitor.price}</td>
                      <td>
                        <button
                          id={monitor.id}
                          onClick={(e) => this.deleteMonitorInfo(e.target.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Monitors;