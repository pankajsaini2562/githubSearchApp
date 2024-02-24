import React from "react";
import "semantic-ui-css/semantic.min.css";

import {
  Form,
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from "semantic-ui-react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [userName, setuserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setfollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
  }) => {
    setName(name);
    setuserName(login);
    setFollowers(followers);
    setfollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
        
      });
  };

  return (
    <div>
      <div className="navbar">Github search</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder=" Enter Github user Name"
              name="github user"
              onChange={handleSearch}
            />
            <Form.Button content="search here" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <CardContent>
              <CardHeader>{name}</CardHeader>
              <CardHeader>{userName}</CardHeader>
            </CardContent>
            <CardContent extra>
              <a>
                <Icon name="user" />
                {followers} Followers
              </a>
            </CardContent>
            <CardContent extra>
              <a>
                <Icon name="user" />
                {repos} repos
              </a>
            </CardContent>
            <CardContent extra>
              <a>
                <Icon name="user" />
                {following} Following
              </a>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
