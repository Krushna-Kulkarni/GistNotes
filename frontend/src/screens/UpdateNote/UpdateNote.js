import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNoteAction, updateNoteAction } from "./../../slices/noteSlice";

function UpdateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updateNote = useSelector((state) => state.updateNote);
  const { loading, error } = updateNote;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteNote = useSelector((state) => state.deleteNote);
  const { loading: loadingDelete, error: errorDelete } = deleteNote;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mynotes");
  };

  const { id } = useParams();

  useEffect(() => {
    const fetching = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(`/api/notes/${id}`, config);

      setTitle(data?.title);
      setContent(data?.content);
      setCategory(data?.category);
      setDate(data?.updatedAt);
    };

    fetching();
  }, [id, date, userInfo]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label className="my-2">Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={`Enter text here in Markdown Format - \n **This is bold text** \n_This text is italicized_ \n # A first-level heading \n ## A second-level heading \n ### A third-level heading \n - This is bullet point \n 1.This is List `}
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card className="my-2">
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label className="my-2">Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button className="my-2" variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="m-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updating on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default UpdateNote;
