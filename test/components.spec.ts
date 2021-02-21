import { expect } from 'chai';
import { Button } from '../src/components/button/button.js';
import { templateCompiler } from '../src/core/template-compiler.js';

describe('Components', async () => {
    it('Button component', () => {
        const button = new Button({ isDisabled: 'disabled', type: 'submit', class: 'profile__form-submit default-button', name: 'Сохранить' });
        const html = '<button disabled type="submit" class="profile__form-submit default-button">Сохранить</button>';
        const template = templateCompiler(button.render(), button.props);

        expect(template).to.equal(html);
    });
});
