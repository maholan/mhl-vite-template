import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { ThemeScript } from "@maholan/theme";
import App from "./App.tsx";
import "./index.css";

// Inject the MHL theme script into <head> before the first paint to prevent
// flash of wrong theme (FOWT). renderToStaticMarkup extracts the raw <script>
// HTML string from ThemeScript, which we then inject as a real DOM node.
const themeScriptHtml = renderToStaticMarkup(
  <ThemeScript defaultMode="light" storageKey="mhl-theme-mode" />
);
const themeScriptContainer = document.createElement("div");
themeScriptContainer.innerHTML = themeScriptHtml;
const scriptEl = themeScriptContainer.firstChild;
if (scriptEl) document.head.appendChild(scriptEl);

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
