## 学了啥

### 2022/10/20

- ejs: template,layouts
- scope
- var/let/const
- 如何利用 node module 来在文件里调用其他文件内容
- 重温 array。[]，array.push()
- 重温 funcion()。括号里的变量的使用，加括号是要调动 function。
- 重温 if/else,switch,for

### 10/26

- string 引号里面不要乱加空格，会直接导致 value 变不一样。checkbox 的 value 不小心加了一个空格，导致我要删除的 item 的 id 不对了
- 怎么用 mongoose 把 database 用起来
- 复习了 forEach。尽量选择最贴合本质逻辑的方式去编写代码。
- 复习了用 route params 来自己创造新网页
- 编写 ejs 文件的时候最好把 format on save 关掉，要不然真的经常出现 syntax error

## 问题

- √ ：check 了 item 之后，再加新的 item 会整个刷新，之前 checked item 会变成没有 check 的状态。
  solution：mongoose database
- √ ：总是出现 SyntaxError: Unexpected identifier in C:\Users\lenovo\Desktop\webDevelop\13-todoList-v1-ejs\views\list.ejs while compiling ejs。
  solution：观察了很久代码，发现有几个普通的 html 的 tag 的关闭部分都很奇怪，是红色的。所以把 1st version 的代码 copy 过来，替换了，但是保存以后又会变得很奇怪，关掉 format on save 就好了。
- 喜欢的外观
