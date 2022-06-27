const Parse = require('parse/node');
Parse.initialize('JZsDrE4Za6whOKdf69XBjxQk1daHq2o6s8DIzInx')
Parse.serverURL = 'http://localhost:1337/parse';

// const TestObject = Parse.Object.extend("TestObject");
// const obj = new TestObject();
// obj.save().then(console.log);

const TestClass = Parse.Object.extend("TestClass");

(async () => {
    const user = new Parse.User();
    user.set("email", "martin.zimmermann@bytepoets.com");
    user.set("username", "uuidv4");
    user.set("password", "123456");

    await user.signUp();
    return;

    const result = await new Parse.Query(TestClass).findAll();
    for (const obj of result) {
        console.log(obj.id, obj.Name);
    }
})();
