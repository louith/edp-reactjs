import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Spinner } from "./components/ui/spinner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import Button from "./components/Button";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      // congetst res = await axios.get("http://localhost:3000/users");
      const response = await axios.get(
        "http://localhost:3000/users",
        // "https://jsonplaceholder.typicode.com/users",
      );
      // console.log("Users:", response.data);
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {isLoading ? (
        <Spinner className={"col-span-2"} />
      ) : users.length === 0 ? (
        <p className="col-span-2 text-center">No users found.</p>
      ) : (
        users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
              <p>This is user #{user.id}</p>
            </CardContent>
            <CardFooter>
              <Button title={"Add"}></Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

export default App;
