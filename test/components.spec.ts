import { expect } from 'chai';
import { Button } from '../src/components/button/button';
import { templateCompiler } from '../src/core/template-compiler';

describe('Components', async () => {
  it('Button component', () => {
    const button = new Button({ isDisabled: 'disabled', type: 'submit', class: 'profile__form-submit default-button', name: 'Сохранить' });
    const html = '<button disabled type="submit" class="profile__form-submit default-button">Сохранить</button>';
    const template = templateCompiler(button.render(), button.props);

    expect(template).to.equal(html);
  });
});
