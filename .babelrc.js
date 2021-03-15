const isDev = process.env.NODE_ENV === "development";

module.exports = {
  presets: [
    // "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [isDev && "react-refresh/babel"].filter(Boolean),
};
