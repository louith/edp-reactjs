import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
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
import MyButton from "./components/Button";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import {
  getUsers,
  createUser,
  deleteUser,
  // patchUser,
  updateUser,
} from "./services/userService";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./components/ui/field";
import { Input } from "./components/ui/input";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // const getUsers = async () => {
  //   setIsLoading(true);

  //   try {
  //     // const res = await axios.get("http://localhost:3000/users");
  //     const response = await API.get("/users");

  //     // console.log("Users:", response.data);
  //     setUsers(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // get
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getUsers();
      setUsers(res.data); // IMPORTANT
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ DELETE
  const handleDeleteUser = async (id) => {
    await deleteUser(id);

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateUser(selectedId, formData);
    } else {
      await createUser(formData);
    }

    setFormData({ name: "", email: "" });
    setOpen(false);
    setIsEditing(false);
    setSelectedId(null);
    fetchUsers();
  };

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center justify-start bg-gray-200">
      <Navbar />

      <MyButton
        title="+ Add User"
        onClick={() => {
          setOpen(true);
          setFormData({ name: "", email: "" });
        }}
        className={"my-4 self-start ml-32"}
      />
      <div className="max-w-[85vw] w-full grid grid-cols-3 gap-3 p-4 h-fit">
        {isLoading ? (
          <Spinner className={"col-span-2"} />
        ) : users.length === 0 ? (
          <p className="col-span-2 text-center">No users found.</p>
        ) : (
          users.map((user) => (
            <Card key={user.id} className={"w-full h-fit"}>
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <CardAction>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="ghost"
                    size="icon-sm"
                    className={"hover:text-blue-500 cursor-pointer"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>This is user #{user.id}</p>
              </CardContent>
              <CardFooter>
                <MyButton
                  title="Edit"
                  onClick={() => {
                    setIsEditing(true);
                    setSelectedId(user.id);
                    setFormData({
                      name: user.name,
                      email: user.email,
                    });
                    setOpen(true);
                  }}
                />
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-106.25 md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit User" : "Add User"}</DialogTitle>
            <DialogDescription>
              {`Fill out the form below to ${isEditing ? "edit" : "add"} a user.`}
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            {/* <p className="text-sm text-muted-foreground">
              This is some scrollable content.
            </p> */}
            <Field>
              <FieldLabel className={"font-bold"}> Name</FieldLabel>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <FieldLabel className={"font-bold"}> Email</FieldLabel>
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </Field>

            <DialogFooter>
              <MyButton
                type="submit"
                title={isEditing ? "Save Changes" : "Create User"}
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
