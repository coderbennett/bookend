# Bookend

![License Badge](https://img.shields.io/badge/License-MIT-blue)  
Deployed Application: https://glacial-plateau-74113.herokuapp.com/  
GitHub Repository: https://github.com/coderbennett/bookend

## Table of Contents

- [Description](#description)
- [Screenshot](#screenshot)
- [Code Examples](#code-examples)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)
- [Questions](#questions)
- [License](#license)

## Description

Bookend is a full stack application that allows readers to create an account and join a community of others in finding new books to read, viewing public book clubs, or even creating their own clubs and inviting their friends and family.

## Screenshot

![Screen Shot 2022-05-12 at 9 13 33 PM](https://user-images.githubusercontent.com/99947655/168211624-1077d555-dc11-4a8c-91e1-3bcc07351e69.png)

## Code Examples

This code example shows an html route used for displaying information on a single book.

```js
router.get("/book/:id", withAuth, async (req, res) => {
  const bookData = await Book.findByPk(req.params.id, {
    include: [
      {
        model: Review,
        include: [{ model: Comment, include: Reader }, { model: Reader }],
      },
    ],
  });
  if (!bookData) {
    return res.status(404).json({ message: "No book found with this id." });
  }
  const book = bookData.get({ plain: true });
  const bookFavoriteCount = await ReaderBook.count({
    where: {
      book_id: req.params.id,
    },
  });
  const bookFavoriteByReaderData = await ReaderBook.findOne({
    where: {
      reader_id: req.session.user_id,
      book_id: req.params.id,
    },
  });
  console.log(book.reviews);
  const isFavorite = bookFavoriteByReaderData ? true : false;

  res.render("book", {
    book: book,
    bookFavoriteCount: bookFavoriteCount,
    isFavorite: isFavorite,
    logged_in: req.session.LoggedIn,
  });
});
```

This code example shows an api route used to let a reader post a review for a book.

```js
router.post("/", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.create({
      title: req.body.title,
      body: req.body.body,
      reader_id: req.session.user_id,
      book_id: req.body.id,
    });

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});
```

This code example is a function that was written and used in many different areas of the code base to determine logged in status and provide certain permissions based on the result.

```js
const withAuth = (req, res, next) => {
  if (!req.session.LoggedIn) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = withAuth;
```

## Technologies Used

![JavaScript Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
![CSS Badge](https://img.shields.io/badge/Language-CSS-blue)
![Handlebars Badge](https://img.shields.io/badge/Language-Handlebars-orange)
![Mysql Badge](https://img.shields.io/badge/Database-MySql-informational)
![Sequelize Badge](https://img.shields.io/badge/NPM-Sequelize-important)
![Connect-session-sequelize](https://img.shields.io/badge/NPM-connect--session--sequelize-brightgreen)
![Node.js Badge](https://img.shields.io/badge/Environment-Node.js-red)
![Express Badge](https://img.shields.io/badge/NPM-Express.js-green)
![Express-handlebars](https://img.shields.io/badge/NPM-express--handlebars-yellowgreen)
![Express-session](https://img.shields.io/badge/NPM-express--session-ff69b4)
![Markdown JS Badge](https://img.shields.io/badge/NPM-Markdown%20js-yellow)
![Dotenv Badge](https://img.shields.io/badge/NPM-dotenv-blueviolet)
![bcrypt](https://img.shields.io/badge/NPM-bcrypt-9cf)
![JQuery Badge](https://img.shields.io/badge/UI-JQuery%20UI-important)
![Tailwind Badge](https://img.shields.io/badge/CSS-Tailwind-blue)

## Contributors

- [Joey Bennett](https://github.com/coderbennett)
- [John Netzel](https://github.com/CommieDog)
- [Andrew Mason](https://github.com/atmason90)

## Questions

If there are any questions about this project, please reach out to any of the contributors via their GitHub profiles.

## License

MIT License

Copyright (c) 2022 Joey Bennet, John Netzel, Andrew Mason

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
