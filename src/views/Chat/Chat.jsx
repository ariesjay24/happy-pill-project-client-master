import React, { useState, useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import http from "../../lib/http";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await http().get("/messages");
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error("Messages response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    window.Pusher = Pusher;

    const pusherAppKey = import.meta.env.VITE_PUSHER_APP_KEY;
    const pusherCluster = import.meta.env.VITE_PUSHER_APP_CLUSTER;

    if (!pusherAppKey) {
      console.error("Pusher app key is missing.");
      return;
    }

    window.Echo = new Echo({
      broadcaster: "pusher",
      key: pusherAppKey,
      cluster: pusherCluster,
      forceTLS: true,
      encrypted: true,
      wsHost: import.meta.env.VITE_PUSHER_HOST,
      wsPort: import.meta.env.VITE_PUSHER_PORT,
      wssPort: import.meta.env.VITE_PUSHER_PORT,
      disableStats: true,
    });

    window.Echo.channel("chat").listen("MessageSent", (e) => {
      setMessages((prevMessages) => [...prevMessages, e.message]);
    });

    return () => {
      window.Echo.leaveChannel("chat");
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      await http().post("/messages", { message });
      setMessages((prevMessages) => [
        ...prevMessages,
        { message }, // Adding the new message to the list
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error.response.data);
    }
  };

  return (
    <Container className="chat-container">
      <Row>
        <Col>
          <Card className="chat-card">
            <Card.Header className="chat-header">Chat</Card.Header>
            <Card.Body className="chat-body">
              <div className="message-list">
                {messages.map((msg, index) => (
                  <div key={index} className="message">
                    {msg.message}
                  </div>
                ))}
              </div>
            </Card.Body>
            <Card.Footer className="chat-footer">
              <Form onSubmit={handleSendMessage} className="d-flex">
                <Form.Control
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="me-2"
                />
                <Button type="submit">Send</Button>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
