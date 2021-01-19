export const loginTemplate = `
    <form class="sign__box login__box">
        <div class="sign__content">
            <div class="sign__title">Вход</div>
            <div class="form-item login__field">
                <input name="login" type="text" id="login" placeholder="&nbsp;">
                <label for="login" data-label="Логин"></label>
            </div>
            <div class="form-item">
                <input name="pass" type="text" id="pass" placeholder="&nbsp;">
                <label for="pass" data-label="Пароль"></label>
            </div>
        </div>
        <div class="sign__footer">
            {{{ button }}}
            <a class="sign__account" href="../registration/registration.html">Нет аккаунта?</a>
        </div>
    </form>
`;
