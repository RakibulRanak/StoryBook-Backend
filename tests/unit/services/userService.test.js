const { UserService } = require("../../../services/userService")
const { PgUserDao } = require('../../../data/dao/userDao/pgUserDao');
const userDao = new PgUserDao();
const userService = new UserService(userDao);


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

describe('UserService', () => {
    test('Should create an user and response 201', async () => {
        jest.spyOn(userDao, 'createUser').mockImplementation(() => {
            users.push(newUser);
            return filter(newUser);
        });
        const res = await userService.createUser(newUser);
        expect(userDao.createUser).toHaveBeenCalledTimes(1);
    })

    test('Should get an user and response 200', async () => {
        jest.spyOn(userDao, 'getUser').mockResolvedValue(filter(users[0]));
        const username = '';
        const user = await userService.getUser(username);
        expect(userDao.getUser).toHaveBeenCalledTimes(1)
        expect(user.username).toEqual("testing3")
        expect(user.password).toBeUndefined()
    })
})





