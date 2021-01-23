export default `
    <nav class="profile__nav">
        <a type="button" class="profile__nav-button" href="../chat/chat.html"></a>
    </nav>
    <div class="profile__info">
        <div class="profile__avatar"></div>
        <div class="profile__name">{{ name }}</div>
        <form class="profile__form profile__container">
            <div class="profile__form-item">
                <span class="profile__form-text">Старый пароль</span>
                <input id="pass" name="pass" type="password" class="profile__form-input">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Новый пароль</span>
                <input id="newPass" name="newPass" type="password" class="profile__form-input">
            </div>
            <div class="profile__form-item">
                <span class="profile__form-text">Повторите новый пароль</span>
                <input id="newPassMore" name="newPassMore" type="password" class="profile__form-input">
            </div>
        </form>
        {{{ button }}}
    </div>
`;
//# sourceMappingURL=change-pass.template.js.map