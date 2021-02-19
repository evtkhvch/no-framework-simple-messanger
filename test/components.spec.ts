import { expect } from 'chai';
import { Button } from '../src/components/button/button.js';

describe('Components', async () => {
    it('Button component', () => {
        const button = new Button({ type: 'submit', class: 'profile__form-submit default-button', name: 'Сохранить' }).elementToString;
        const html = '<button type="submit" class="profile__form-submit default-button">Сохранить</button>';

        expect(button).to.equal(html);
    });
});
