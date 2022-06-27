const Parse = require('parse/node');
Parse.initialize('JZsDrE4Za6whOKdf69XBjxQk1daHq2o6s8DIzInx')
Parse.serverURL = 'http://localhost:1337/parse';

const Product = Parse.Object.extend("Product");
// const obj = new TestObject();
// obj.save().then(console.log);

const listAll = async (className) => {
    const result = await new Parse.Query(className).findAll();
    for (const obj of result) {
        console.log(obj.id, obj.toJSON());
    }
}

(async () => {
    await listAll(Parse.User);
    await listAll(Parse.Role);
    await listAll('Product');

    return;
    const user = await Parse.User.logIn("user-A", "123456");

    const obj = new Product();
    obj.name = "Foo";
    obj.owner = user;

    new Parse.ACL(user)
    obj.setACL(role, null);

    console.log(await obj.save());

    return;
    const result = await new Parse.Query(Parse.User).findAll();
    for (const obj of result) {
        console.log(obj.id);
        console.log(obj.attributes);
    }
})();
