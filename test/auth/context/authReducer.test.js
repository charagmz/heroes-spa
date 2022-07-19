import { authReducer, types} from "../../../src/auth";

describe('Pruebas en authReducer', () => {

    test('Debe de retornar el estado por defecto', () => {
        const initialState = {logged: false};
        const state = authReducer(initialState, {});
        expect(state).toBe(initialState);
        const state2 = authReducer({logged: false}, {});
        expect(state2).toEqual({logged: false});
    });

    test('Debe de (login) llamar el login, autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {id: 'ABC', name: 'Juan'}
        }
        const state = authReducer({logged: false}, action);
        expect(state.logged).toBeTruthy();
        expect(state.user).toEqual(action.payload);
        expect(state).toEqual({
            logged: true,
            user: action.payload
        });
    });

    test('Debe de (logout) borrar el name del usuario y logged en false', () => {
        const initialState = {
            logged: true, 
            user: {id:'123', name: 'Juan'}
        };
        const action = {
            type: types.logout
        }
        const state = authReducer(initialState, action);
        expect(state.logged).toBeFalsy();
        expect(state).toEqual({logged: false});
    });
});