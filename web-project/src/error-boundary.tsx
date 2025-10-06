import React from "react";

type State = { hasError: boolean; info?: string };
export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(err: unknown) { return { hasError: true, info: String(err) }; }
  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error("[SmartFarm Web] Runtime Error:", error, info);
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{padding:"24px", fontFamily:"system-ui"}}>
        <h2>Something went wrong</h2>
        <p>The app hit an error, but we did NOT hide it. Check DevTools Console for details.</p>
        <pre style={{whiteSpace:"pre-wrap"}}>{this.state.info}</pre>
        <button onClick={()=>location.reload()}>Reload</button>
      </div>
    );
  }
}
