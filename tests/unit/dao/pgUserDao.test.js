const { PgUserDao } = require('./../../../data/dao/userDao/pgUserDao');
const userDao = new PgUserDao();
const User = require('./../../../models/userModel');


let users = [];

let newUser = {
    username: 'testing3',
    name: 'Rakibul3',
    email: 'testing3@gmail.com',
    password: 'testing',
}
const filter = (obj) => {
    obj.password = undefined;
    obj.confirmPassword = undefined;
    return obj;
}

describe('PgUserDao', () => {
    test('Should create an user and return user body ', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue(false);
        jest.spyOn(User, 'create').mockImplementation(() => {
            users.push(newUser);
            return filter(newUser);
        });
        const res = await userDao.createUser(newUser);
        expect(User.findOne).toHaveBeenCalledTimes(1);
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(res.password).toBe(undefined);

    })

    test('Should get an user and response 200', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue(filter(users[0]));
        const username = 'testing3';
        const user = await userDao.getUser(username);
        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(user.password).toBeUndefined()
    })

    test('Should get users', async () => {
        jest.spyOn(User, 'findAll').mockResolvedValue(users);
        const req = { query: {} };
        const res = await userDao.getUsers(req);
        expect(User.findAll).toHaveBeenCalledTimes(1)
        expect(res[0].password).toBe(undefined)
        expect(res[0].username).toBe(users[0].username)
    })
})



