export default `
    <form class="sign__box login__box">
        <div class="sign__content">
            <div class="sign__title">Вход</div>
            <div class="form-item login__field">
                <input name="login" type="text" id="login" placeholder="&nbsp;">
                <label for="login" data-label="Логин"></label>
                <span class="error-message"></span>
            </div>
            <div class="form-item">
                <input type="password" name="pass" id="pass" placeholder="&nbsp;">
                <label for="pass" data-label="Пароль"></label>
                <span class="error-message"></span>
            </div>
        </div>
        <div class="sign__footer">
            {{{ button }}}
            <a class="sign__account">Нет аккаунта?</a>
        </div>
    </form>
`;
