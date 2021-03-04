export default `
    <div class="chats-bar">
        <nav class="chats-bar__header">
            <a class="chats-bar__header-title">Профиль</a>
        </nav>
        <div class="chats-bar__search-bar search-bar">
            <input type="text" id="search" placeholder="&nbsp;">
            <label for="search">Поиск</label>
        </div>
        <div class="add-chat chats-bar__add-chat">Добавить чат</div>
        <ul class="user-card__list">
            {{{ cardList }}}
        </ul>
    </div>
`;
