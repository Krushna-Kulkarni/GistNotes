import React from "react";
import MainScreen from "../../components/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const notes = [
  {
    _id: "1",
    title: "Day 1 of college",
    content:
      "I made a few new friends and introduced myself to a lot of new teachers.",
    category: "College",
  },
  {
    _id: "2",
    title: "Learned some Node JS",
    content: "Learned how to create a server in node JS and my first API",
    category: "Learning",
  },
  {
    _id: "3",
    title: "Watched some Anime",
    content: "Finished 2 seasons of Attack on Titan and My Hero academia.",
    category: "Entertainment",
  },
  {
    _id: 4,
    title: "Started React JS",
    content:
      "Made my first App in React JS, feels awesome to learn something new. I aim to be a full stack dev someday",
    category: "Learning",
  },
];

const MyNotes = () => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
    }
  };

  return (
    <MainScreen title="Welcome Back Krushna Kulkarni...">
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {notes?.map((note) => {
        return (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventkey="1">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Button as={Card.Text} variant="link">
                      {note.title}
                    </Accordion.Button>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse>
                  <Card.Body>
                    <h4>
                      <Badge bg="success" text="light">
                        Category - {note.category}{" "}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note?.createdAt?.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </MainScreen>
  );
};

export default MyNotes;
