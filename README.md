![movie-craze-logo](https://user-images.githubusercontent.com/77767256/128086463-3794c5e1-621b-4c64-a697-452963ec9f31.jpg)

```Movie Craze``` is a database where users can find info on their favorite movies and curate their own list of favorites.

## Tools Used:
- React 
- React-Redux
- Express
- Mongoose
- Axios
- React-Bootstrap

## Dev Tools:
- Parcel

## Code Examples:
```
populateFavMovies() {
    let favArr = [];
    this.props.user.FavoriteMovies.map((favID) => {
      this.props.movies.map((m) => {
        if (m._id === favID) {
          favArr.push(m);
        }
      });
    });
    this.props.setFavMovies(favArr);
  }
```
```
if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }
```

## Useage

- Registration with input validation
![registration-view-preview](https://user-images.githubusercontent.com/77767256/128088680-6ee3049d-5ea0-4f49-8e2e-f6529dd87388.jpg)

- Login into your new account
![login-preview](https://user-images.githubusercontent.com/77767256/128090582-e3537db6-27ef-4066-9639-6e73f5d64646.jpg)


- Browse movies
![main-view-preview](https://user-images.githubusercontent.com/77767256/128090346-7ed3e498-10f3-4ba2-a630-6adc6e94d51a.jpg)

- Get movie details, including director and genre info
![movie-details-preview](https://user-images.githubusercontent.com/77767256/128090144-b511955f-4b3e-4449-a502-56fbb7096826.jpg)

- Edit user information
![edit-user-preview](https://user-images.githubusercontent.com/77767256/128090181-5582c434-7975-4c1e-84c3-32a652931c43.jpg)
