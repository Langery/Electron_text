import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <h2>应用出错了</h2>
          <p style={{ color: '#666' }}>渲染过程中发生了未捕获的错误:</p>
          <pre style={{
            background: '#f5f5f5',
            padding: 12,
            borderRadius: 4,
            overflow: 'auto'
          }}>
            {this.state.error?.message}
          </pre>
          <button onClick={this.handleReset}>重试</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
