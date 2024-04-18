import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../../components/Layout";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import styles from "../../styles/components/Books.module.scss";

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const authContext = useContext(AuthenticationContext);
  const singleBook = authContext.books.find((book) => book._id === id);
  const returnToBookList = () => {
    router.push("/books/allbooks");
  };
  if (!authContext.books.length || !singleBook) {
    return (
      <Layout books={true}>
        <div className={styles.loader}></div>
      </Layout>
    );
  }

  return (
    <Layout books={true}>
      <div className={styles.container}>
        <div className={styles.allBooksWrapper}>
          <Card
            sx={{ width: 275 }}
            key={singleBook._id}
            className={styles.singleBookInList}
          >
            <CardContent>
              <img src={singleBook.image} className="imageBookList" />

              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                {singleBook.name}
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5, fontSize: 11 }} color="text.secondary">
                Author: {singleBook.author}
              </Typography>
              <Typography variant="body2">{singleBook.genre.name}</Typography>
            </CardContent>

            <CardActions>
              <Button size="small" onClick={returnToBookList}>
                Return
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetails;
