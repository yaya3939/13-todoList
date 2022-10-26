const express = require("express");
const bodyParser = require("body-parser");
//调用静态module
const date = require(__dirname + "/date.js");
/*利用node的module概念，将所有不在逻辑线条内的代码块
移动到别的文件去，可以让逻辑和代码看起来更清晰简洁易懂*/
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//set ejs
app.set("view engine", "ejs");

//datas
//调用其他module下的function的具体方式：
const day = date.getDate("en-US");
//en-US, zh-CN...

//没有数据库时候的datas
// const items = ["Buy food", "Read book", "Text preparation"];
// const workItems = [];
//在开头设置空的变量，避免后面因为顺序问题导致的not defined error
//要连续加新的item，所以选择array。这样就不会出现新的item directly replace old one的问题
//把array、object设置成const，依然可以改变增减里面的项目。只是不能整个重新设定

//database
mongoose.connect("mongodb://localhost:27017/todolistDB");

// item collection
const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({ name: "Welcome to your todolist!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const item3 = new Item({ name: "<-- Hit this to delete an item." });
const defaultItems = [item1, item2, item3];

//list collection
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});
const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      //怎么检查array里的项的数量
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully insert default items.");
        }
      });
      res.redirect("/"); //这样才能显示，要不然就没有render了
    } else {
      res.render("list", { listTitle: day, newListItems: foundItems });
      /*渲染一个叫list的文件，给其中名为listTitle的key，赋予一个day的value
  the key of object have to exist in ejs file
  把key放在一个render里，可以避免因某些key暂时没有值而崩溃*/
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

//customi lists by route params
app.get("/:custom", function (req, res) {
  const customList = _.capitalize(req.params.custom);

  List.findOne({ name: customList }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //!:dont't have sth
        //create new list
        const list = new List({
          name: customList,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customList);
      } else {
        //show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  //把数据传到数据库
  const item = new Item({ name: itemName });

  if (listName === day) {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === day) {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("successfully delete checked item");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

app.listen(3000, function () {
  console.log("server started at 3000.");
});
