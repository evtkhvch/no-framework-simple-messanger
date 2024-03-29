export default `
    <nav class="profile__nav">
        <a type="button" class="profile__nav-button"></a>
    </nav>
    <div class="profile__info">
        <label for="avatar">
            <img src="{{ avatar }}" class="profile__avatar change-data"/>
        </label>
        <input type="file" class="profile__change-img" id="avatar" name="avatar" accept="image/png, image/jpeg">
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
            <div class="profile__submit">
                <button type="submit" class="profile__form-submit default-button">Сохранить</button>
            </div>
        </form>
    </div>
`;
