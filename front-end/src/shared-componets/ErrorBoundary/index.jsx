import React from 'react';
import { Redirect } from 'react-router-dom';
import appRoutes from '../../core/app-routes';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    if (hasError) {
      // En caso de un error se redirije a la pantalla de búsqueda
      return <Redirect to={appRoutes.searchBox} />;
    }

    return children;
  }
}

export default ErrorBoundary;
