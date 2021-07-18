import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Descrizione del sito per i motori di ricerca"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Gabriele:9qZkManW5Oi89CkC@cluster0.8kspf.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    //RITORNERA' SEMPRE UN OBJ.
    props: {
      //PROPS SARA' DA PASSARE COME ARGOMENTO DELLA FUNZIONE PRINCIPALE DELLA PAGE.
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};

// export const getServerSideProps = async (context) => {
//     const req = context.req;
//     const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default HomePage;
