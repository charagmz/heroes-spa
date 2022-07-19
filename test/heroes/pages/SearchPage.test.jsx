import { act, fireEvent, render, renderHook, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
// import { AuthContext } from "../../../src/auth";
import { SearchPage } from "../../../src/heroes";
import { useForm } from "../../../src/hooks/useForm";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks());


    test('Debe de mostrarse correctamente con valores por defecto', () => {
        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        // screen.debug();
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');
        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
        const divSearch = screen.getByLabelText('alert-search-hero');
        expect(divSearch.style.display).toBe('none');
        const divNotfound = screen.getByLabelText('alert-hero-notfound');
        expect(divNotfound.style.display).toBe('none');
    });

    test('Debe de mostrar un error si no se encuentra el hero', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );
        // screen.debug();
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman123');
        const divNotfound = screen.getByLabelText('alert-hero-notfound');
        expect(divNotfound.style.display).toBe('');
    });

    test('Debe de llamar el navigate a la pantalla nueva', () => {
        const initialForm = {searchText: ''}

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        let newValue = 'superman';
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {'target': {name: 'searchText', value: newValue}});
        const button = screen.getByRole('button', {name: 'Search'});
        fireEvent.click(button);
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${newValue}`);

        newValue = 'flash';
        fireEvent.change(input, {'target': {name: 'searchText', value: newValue}});
        const form = screen.getByRole('form');
        fireEvent.submit(form);
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${newValue}`);
        
        // screen.debug();
        // console.log(result);
    });
});