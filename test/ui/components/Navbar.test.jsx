import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate} from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <Navbar />', () => {
    const contextValue = {
        logged: true, 
        user: {
            id: '123',
            name: 'Charly AM'
        },
        logout: jest.fn()
    };

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el nombre del usuario', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        // screen.debug();
        expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    });

    test('Debe de hacer logout', () => {
        //cuando se da click en el logout, se llama el navigate con el arg login y replace
        //verificar que se llamo el logout

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const buttonElement = screen.getByRole('button', {name: 'Logout'});
        fireEvent.click(buttonElement);
        // screen.debug();
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {replace: true});
    });
});