/**
 * es5
 */

function Person(name, age) {
    this.name = name,
        this.age = age,
        this.run = function () {
            console.log(`${this.name} + ${this.age}`)
        }
}
Person.prototype.sex = 'nv'
Person.prototype.work = function () {
    console.log(`${this.name} + ${this.age} +${this.sex}`);
}


Person.setName = function () {
    console.log("静态方法");

}
let p = new Person("zhangsan", 30)

p.run();
p.work();

Person.setName();

function web(name, age) {
    Person.call(this, name, age)
}
web.prototype = new Person();
var w = new web("lisi", "23")

w.run();
w.work();

/**
 * es6
 */

class Person2 {
    constructor(name, age, sex) {
        this._name = name;
        this._age = age;
        this._sex = sex;
    }
    getInfo() {
        console.log(`姓名${this._name} 年龄${this._age} 性别 ${this._sex}`)
    }
    getName() {
        console.log(this._name);
    }
    setName(name) {
        this._name = name;
    }
}

class Web extends Person2 {
    constructor(name, age, sex) {
        super(name, age, sex)
        this.sex = sex;
    }
    print() {
        console.log(this.sex);
    }
}
var w = new Web("zhangsan", "30", "nan");
w.getInfo();


class Person3 {
    static getInstance() {
        if (!Person3.instance) {
            Person3.instance = new Person3();
        }
        return Person3.instance

    }
    constructor() {
        console.log('实例化方法');
        this.connect();
    }
    connect() {
        console.log("连接数据库");
    }
    find() {
        console.log('查询数据库');
    }
}


var db = Person3.getInstance();

var db2 = Person3.getInstance();
var db3 = Person3.getInstance();
var db4 = Person3.getInstance();
db3.find()
db4.find()