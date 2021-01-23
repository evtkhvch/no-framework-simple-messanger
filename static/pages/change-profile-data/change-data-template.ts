export default `
    <nav class="profile__nav">
        <a type="button" class="profile__nav-button" href="../chat/chat.html"></a>
    </nav>
    <div class="profile__info">
        <div class="profile__avatar"></div>
        <div class="profile__name">{{ name }}</div>
        <form class="profile__form profile__container">
            <div class="profile__form-item">
                <span class="profile__form-text">Почта</span>
                <input id="mail" name="mail" type="text" class="profile__form-input">
                <span class="error-message"></span>
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Логин</span>
                <input id="login" name="login" type="text" class="profile__form-input">
                <span class="error-message"></span>
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Имя</span>
                <input id="userName" name="userName" type="text" class="profile__form-input">
                <span class="error-message"></span>
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Фамилия</span>
                <input id="surname" name="surname" type="text" class="profile__form-input">
                <span class="error-message"></span>
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Имя в чате</span>
                <input id="nameInChat" name="nameInChat" type="text" class="profile__form-input">
                <span class="error-message"></span>
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Телефон</span>
                <input id="phone" name="phone" type="text" class="profile__form-input">
                <span class="error-message"></span>
            </div>
        </form>
        <button class="profile__form-submit default-button" onclick="location.href='../profile/profile.html'">Сохранить</button>
    </div>
`;
