const Parse = require('parse/node');
Parse.initialize('JZsDrE4Za6whOKdf69XBjxQk1daHq2o6s8DIzInx', 'xuTer68DuyQOg0RAtFuWYTtKixDbQiSySm2qlZ6k')
Parse.serverURL = 'http://localhost:1337/parse'

const TestObject = Parse.Object.extend('TestObject')

// Bv2r9RxO9c
async function main() {
    // const user = await new Parse.Query(Parse.User).get('Bv2r9RxO9c')
    // const testObj = new TestObject();
    // const groupAcl = new Parse.ACL();

    // groupAcl.setWriteAccess(user, true);
    // testObj.setACL(new Parse.ACL(), {});
    // await testObj.save();

    // console.log(user);
    const result = await new Parse.Query(Parse.User).findAll();
    for (const obj of result) {
        console.log(obj.attributes);
    }
}
main();
