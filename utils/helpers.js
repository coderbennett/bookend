module.exports = {
    // Given a username that may or may not be null, get a suitable display value
    display_username: function(username)
    {
        return username || "<deleted>";
    }
};  