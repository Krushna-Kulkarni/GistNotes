import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteNoteAction, listNotes } from "./../../slices/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./../../components/Loading";
import ErrorMessage from "./../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state?.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const createNote = useSelector((state) => state.createNote);
  const { success: successCreate } = createNote;

  const updateNote = useSelector((state) => state.updateNote);
  const { success: successUpdate } = updateNote;

  const deleteNote = useSelector((state) => state.deleteNote);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteNote;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome back ${userInfo?.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {loadingDelete && <Loading />}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes
        ?.toReversed()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => {
          return (
            <Accordion key={note?._id} defaultActiveKey="0">
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
                        onClick={() => deleteHandler(note?._id)}
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
                        <ReactMarkdown>{note.content}</ReactMarkdown>
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
