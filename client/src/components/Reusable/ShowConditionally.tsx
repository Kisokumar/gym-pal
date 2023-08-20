"use client";

import React from "react";

interface ShowConditionallyComponentPropTypes {
  fallback?: React.ReactNode;
  variable: boolean;
  children?: React.ReactNode;
}

export default function ShowConditionally(
  props: ShowConditionallyComponentPropTypes
): JSX.Element {
  if (props.variable === true) {
    return <>{props.children}</>;
  } else {
    return <>{props.fallback ? <>{props.fallback}</> : <></>}</>;
  }
}
