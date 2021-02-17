import { Button } from '../src/components/button/button.js';

describe('Тестирование компоненты', async () => {
    it('Кнопка', () => {
        const button = new Button({ type: 'submit', class: 'profile__form-submit default-button', name: 'Сохранить' }).elementToString;
        const html = '<button type="submit" class="profile__form-submit default-button">Сохранить</button>';

        if (button !== html) {
            throw 'Ошибка рендера';
        }
    });
});
