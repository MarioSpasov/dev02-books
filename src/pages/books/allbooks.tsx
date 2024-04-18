import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../../components/Layout";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import styles from "../../styles/components/Books.module.scss";

function AllBooks() {
  const router = useRouter();
  const storedBooksData = localStorage.getItem("AllBooks");
  const booksData = JSON.parse(storedBooksData);
  const authContext = useContext(AuthenticationContext);

  const openBookDetails = (id) => {
    router.push(`/books/${id}`);
  };

  const booksArray = authContext.books.length
    ? [...authContext.books]
    : [...booksData];

  if (!booksArray.length) {
    return <h1>No books found</h1>;
  }
  return (
    <Layout books={true}>
      <div className={styles.container}>
        <div className={styles.allBooksWrapper}>
          {booksArray.map((book) => {
            return (
              <Card
                sx={{ width: 275 }}
                key={book._id}
                className={styles.singleBookInList}
              >
                <CardContent>
                  <img src={book.image} className="imageBookList" />{" "}
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {book.name}
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography
                    sx={{ mb: 1.5, fontSize: 11 }}
                    color="text.secondary"
                  >
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body2">{book.genre.name}</Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    onClick={() => openBookDetails(book._id)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default AllBooks;
