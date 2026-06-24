module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
//////////////////////
// const env = process.env.APP_ENV || "development";

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//       "nativewind/babel",
//     ],
//     plugins: [
//       [
//         "module:react-native-dotenv",
//         {
//           moduleName: "@env",
//           path: `.env.${env}`, // dynamically load based on APP_ENV
//           safe: false,
//           allowUndefined: true,
//         },
//       ],
//     ],
//   };
// };
