const Parse = require('parse/node');
Parse.initialize('JZsDrE4Za6whOKdf69XBjxQk1daHq2o6s8DIzInx')
Parse.serverURL = 'http://localhost:1337/parse'

// const TestObject = Parse.Object.extend("TestObject");
// const obj = new TestObject();
// obj.save().then(console.log);

async function main() {
    const result = await new Parse.Query(Parse.User).findAll();
    for (const obj of result) {
        console.log(obj.id);
        console.log(obj.attributes);
    }
}
main();
