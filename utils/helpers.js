const markdown = require('markdown');

module.exports = {
    // Given a username that may or may not be null, get a suitable display value
    display_username: function(username)
    {
        return username || "<deleted>";
    },

    parse_markdown: function(text)
    {
        return markdown.parse(text);
    },

    format_timestamp: function(timestamp)
    {
        return timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString();
    }
};
