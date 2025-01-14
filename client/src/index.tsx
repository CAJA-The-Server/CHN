import ReactDOM from "react-dom/client";
import { App } from "./App";

// body에 div 추가 후 div에 <App /> 렌더
const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
