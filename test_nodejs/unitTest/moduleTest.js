const moduleT = require('../core/module_t');

function test() {

	// test1();
	test2();
}

function test1() {
	moduleT.log('aaa');//output:aaa

	//这里因为没有export,所以编译报错。
	//output:moduleT.logWithoutExport is not a function
	// moduleT.logWithoutExport('bbb');
}

function test2() {

	//这里会编译错误，下面的编译正确
	// moduleT.print('ccc');

	moduleT('ddd');
}

exports.test = test;

//http://www.cnblogs.com/dolphinX/p/3485260.html

/*

这里有几个知识点：

1. module.exports与exports

两种本来指同一个对象。引入的是module.exports，如果更改其值，更改的值生效，exports失效。

2. require搜索module方式

* 首先是nodejs本身内部的模块
* 然后是本地文件模块
* 如果没有，接着搜索本文件夹下node_modules下的模块
* 如果没有，循环所以上层次node_modules下的模块。

3. require加载多次的结果

返回的其实是同一个对象。如果对一个操作，另一个内部也会发生。

*/