module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 👇 visit here to know more https://vuejs.org/v2/style-guide/ 
    "plugin:vue/essential", 
  "eslint:recommended"
],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-unused-vars": 1,
    "no-console": process.env.NODE_ENV === "production" ? 1 : 0,
    "no-debugger": process.env.NODE_ENV === "production" ? 1 : 0
  },
};
