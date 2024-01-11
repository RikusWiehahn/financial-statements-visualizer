"use client";
import AppContainer from "./AppContainer";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <AppContainer>
        <div>{props.children}</div>
      </AppContainer>
    </div>
  );
}
