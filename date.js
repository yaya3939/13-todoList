// In the Node.js module system, each file is treated as a separate module.
// app.js loads the module date.js that is in the same directory as app.js.

//getData没加括号是因为不必在这里调用函数
exports.getDate = function (lang) {
  let today = new Date();
  //format the date easily
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "long",
  };

  return today.toLocaleDateString(lang, options);
  //en-US, zh-CN;
};
