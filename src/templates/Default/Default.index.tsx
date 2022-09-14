import Sidebar from "@/components/Sidebar/Sidebar.index";
import React from "react";
import "./Default.styles.css";

type DefaultTemplateProps = {
  children?: React.ReactNode;
};

const DefaultTemplate = ({ children }: DefaultTemplateProps) => {
  const [header, content] = React.Children.toArray(children);
  return (
    <div className="grid-container">
      <Sidebar />
      <header className="header">{header}</header>
      <main className="content">{content}</main>
    </div>
  );
};

export default DefaultTemplate;
