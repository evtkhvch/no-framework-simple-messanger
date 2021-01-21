export default `
    <nav class="profile__nav">
        <a type="button" class="profile__nav-button" href="../chat/chat.html"></a>
    </nav>
    <div class="profile__info">
        <div class="profile__avatar"></div>
        <div class="profile__name">Иван</div>
        <form class="profile__form profile__container">
            <div class="profile__form-item">
                <span class="profile__form-text">Почта</span>
                <input disabled type="text" class="profile__form-input" value="pochta@yandex.ru">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Логин</span>
                <input disabled type="text" class="profile__form-input" value="ivanivanov">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Имя</span>
                <input disabled type="text" class="profile__form-input" value="Иван">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Фамилия</span>
                <input disabled type="text" class="profile__form-input" value="Иванов">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Имя в чате</span>
                <input disabled type="text" class="profile__form-input" value="Иван">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Телефон</span>
                <input disabled type="text" class="profile__form-input" value="+7 (909) 967 30 30">
            </div>
        </form>
        <ul class="profile__options profile__container">
            <li class="profile__option">
                <a class="profile__option-button profile__option-change"
                   href="../change-profile-data/change-profile-data.html">Изменить данные</a>
            </li>
            <li class="profile__option">
                <a class="profile__option-button profile__option-change"
                   href="../change-profile-pass/change-profile-pass.html">Изменить пароль</a>
            </li>
            <li class="profile__option">
                <a class="profile__option-button profile__option-exit" href="../login/login.html">Выйти</a>
            </li>
        </ul>
    </div>
`;
//# sourceMappingURL=profile.template.js.map