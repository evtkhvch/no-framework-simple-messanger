export const chat = `
    {{{ chatsBar }}}
    {{#if isChat}}
    <div class="chat">
        <div class="chat__content">
            <header class="chat__header">
                <div class="chat__header-icon">
                    <div class="chat__header-avatar"></div>
                    <span>{{ name }}</span>
                </div>
                <button type="button" class="chat__options"></button>
            </header>
            <div class="chat__dialog">
            {{{ messageList }}}
        </div>
        {{{ footer }}}
    </div>
    {{else}}
    <div class="dialog">
        <span class="dialog__title">Выберите чат чтобы отправить сообщение</span>
    </div>
    {{/if}}
`;
//# sourceMappingURL=chat.template.js.map