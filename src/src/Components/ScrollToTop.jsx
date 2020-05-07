import { Component } from 'react';
import { withRouter } from "react-router-dom";


//actually in index.js so that everytime a link is clicked, it will go to top of the  page.
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      //window.location.reload();
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)