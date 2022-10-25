const express = require("express");
const bodyParser = require("body-parser");
//调用静态module
const date = require(__dirname + "/date.js");
/*利用node的module概念，将所有不在逻辑线条内的代码块
移动到别的文件去，可以让逻辑和代码看起来更清晰简洁易懂*/

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//set ejs
app.set("view engine", "ejs");

//datas
const items = ["Buy food", "Read book", "Text preparation"];
const workItems = [];
//在开头设置空的变量，避免后面因为顺序问题导致的not defined error
//要连续加新的item，所以选择array。这样就不会出现新的item directly replace old one的问题
//把array、object设置成const，依然可以改变增减里面的项目。只是不能整个重新设定

app.get("/", function (req, res) {
  //调用其他module下的function的具体方式：
  const day = date.getDate("en-US");
  //en-US, zh-CN...

  res.render("list", { listTitle: day, newListItems: items });
  /*渲染一个叫list的文件，给其中名为listTitle的key，赋予一个day的value
  the key of object have to exist in ejs file
  把key放在一个render里，可以避免因某些key暂时没有值而崩溃*/
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "WORK LIST", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "WORK") {
    //不要自己臆想list的值，一定要用consloe.log确定

    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
    /*when post was called, 先把数据记录到server里，然后redirect to
    root route,再次激活app.get("/"...)*/
  }

  /*res.render("list", { newListItem: item }); :
  it wouldn't work. because when u run the local root 
  at the beginning, there's no value of it*/
});

app.listen(3000, function () {
  console.log("server started at 3000.");
});
