const Parse = require('parse/node');

const APP_ID = 'JZsDrE4Za6whOKdf69XBjxQk1daHq2o6s8DIzInx';
const MASTER_KEY = 'xuTer68DuyQOg0RAtFuWYTtKixDbQiSySm2qlZ6k';

Parse.initialize(APP_ID);
Parse.masterKey = MASTER_KEY;
Parse.serverURL = 'http://localhost:1337/parse';

const setCLPs = async () => {
    const rolePermissions = {
        find: { '*': true },
        get: { '*': true },
        count: { '*': true },
        create: {},
        update: {},
        delete: {},
        addField: {},
        protectedFields: { '*': [] },
    };
    await (new Parse.Schema('_Role').setCLP(rolePermissions).update());

    const userPermissions = {
        find: { '*': true },
        get: { '*': true },
        count: { '*': true },
        create: { '*': true },
        update: { '*': true },
        delete: { '*': true },
        addField: {},
        protectedFields: { '*': ['username', 'email'] },
    };
    await new Parse.Schema('_User').setCLP(userPermissions).update();
}

const createRole = async (name) => {
    // Check if the admin role already exists
    const existingAdminRole = await new Parse.Query(Parse.Role)
        .equalTo('name', name)
        .first(null);
    // If the admin role already exists we have nothing to do here
    if (existingAdminRole) {
        console.log(`Role '${ name }' already exists`);
    } else {
        const acl = new Parse.ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(false);

        const adminRole = new Parse.Role()
        adminRole.set('name', name)
        adminRole.setACL(acl, null);

        await adminRole.save({}, { useMasterKey: true })
    }
}

const createClasses = async () => {
    const product = new Parse.Schema('Product')
        .addString('name', null)
        .addDate('activationDate', null)
        .addBoolean('isActive', null)
        .addPointer('owner', '_User');
    try {
        await product.save();
    } catch (err) {
        if (err.code === 103) {
            console.log('Class "Product" already exists')
        } else {
            throw err;
        }
    }
}

const assignRole = async (email, roleName) => {
    const user = await new Parse.Query(Parse.User).equalTo('email', email).first();
    const role = await new Parse.Query(Parse.Role).equalTo('name', roleName).first();
    role.getUsers().add(user);
    await role.save({}, { useMasterKey: true });

    // console.log(user, role);
}

(async () => {
    // await setCLPs();
    // await createRole('Administrator');
    // await createRole('Moderator');

    await assignRole('martin.zimmermann@bytepoets.com', 'Administrator');

    return;
    await createClasses();

    return;
    // const schema = await Parse.Config.get('JZsDrE4Za6whOKdf69XBjxQk1daHq2o6s8DIzInx').database.loadSchema();
    // console.log(schema);
    // return

    // const roleSchema = new Parse.Schema('_Role');
    // roleSchema.setCLP({})
    // console.log(roleSchema);
    // roleSchema.getClassLevelPermissions()
    // roleSchema.setCLP()
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
})();
