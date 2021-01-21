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
                <input name="mail" type="text" class="profile__form-input" value="pochta@yandex.ru">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Логин</span>
                <input name="login" type="text" class="profile__form-input" value="ivanivanov">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Имя</span>
                <input name="userName" type="text" class="profile__form-input" value="Иван">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Фамилия</span>
                <input name="surname" type="text" class="profile__form-input" value="Иванов">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Имя в чате</span>
                <input name="nameInChat" type="text" class="profile__form-input" value="Иван">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Телефон</span>
                <input name="phone" type="text" class="profile__form-input" value="+7 (909) 967 30 30">
            </div>
        </form>
        <button class="profile__form-submit default-button" onclick="location.href='../profile/profile.html'">Сохранить</button>
    </div>
`;
