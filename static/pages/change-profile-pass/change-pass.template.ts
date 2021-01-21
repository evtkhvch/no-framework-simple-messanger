export default `
    <nav class="profile__nav">
        <a type="button" class="profile__nav-button" href="../chat/chat.html"></a>
    </nav>
    <div class="profile__info">
        <div class="profile__avatar"></div>
        <div class="profile__name">Иван</div>
        <form class="profile__form profile__container">
            <div class="profile__form-item">
                <span class="profile__form-text">Старый пароль</span>
                <input name="pass" type="password" class="profile__form-input" value="pochta@yandex.ru">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Новый пароль</span>
                <input name="newPass" type="password" class="profile__form-input" value="ivanivanov">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Повторите новый пароль</span>
                <input name="newPassMore" type="password" class="profile__form-input" value="Иван">
            </div>
        </form>
        <button class="profile__form-submit default-button" onclick="location.href='../profile/profile.html'">Сохранить</button>
    </div>
`;
