import {
  Box,
  Container,
  CssBaseline,
  Button,
  Typography,
  Input,
} from "@mui/material";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import api from "../../services/api";
import Popup from "../../components/Popup";

const Dashboard = ({ auth, setAuth }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:user")) || ""
  );

  useEffect(() => {
    loadTechs();
  }, []);

  const [userToken, setUserToken] = useState(
    localStorage.getItem("@KenzieHub:token") || ""
  );

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const [title, setTitle] = useState("");

  const [tech, setTech] = useState("");

  const [status, setStatus] = useState("Iniciante");

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenCard, setIsOpenCard] = useState(false);

  const toggleCard = (tech_id) => {
    setIsOpenCard(!isOpenCard);
    setTech(tech_id);
  };

  const Toggle = () => {
    setIsOpen(!isOpen);
  };

  const addTechs = (e) => {
    e.preventDefault();
    const newTech = {
      title: `${title}`,
      status: `${status}`,
    };
    api
      .post("/users/techs", newTech, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        loadTechs();
      })
      .catch((err) => toast.error("Nome obrigatório / diferente"));
    Toggle();
  };

  const changeStatus = (tech_id) => {
    tech_id.preventDefault();
    const newStatus = {
      status: `${status}`,
    };
    api
      .put(`/users/techs/${tech}`, newStatus, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        loadTechs();
      })
      .catch((err) => toast.error("O status não pode ser igual"));
    toggleCard();
  };
  const deleteStatus = (tech_id) => {
    tech_id.preventDefault();

    api
      .delete(`/users/techs/${tech}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        loadTechs();
      });
    toast.success("Deletado com sucesso");

    toggleCard();
  };

  const [userTechs, setUserTechs] = useState([]);

  const loadTechs = () => {
    api.get(`/users/${userInfo.id}`).then((response) => {
      setUserTechs(response.data.techs);
    });
  };

  const logOut = () => {
    localStorage.removeItem("@KenzieHub:token");
    setAuth(false);
    toast.success("Deslogado com sucesso");
  };

  if (!auth) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth
        component="header"
        sx={{ bgcolor: "#121214", color: "#FF577F", height: "100vh" }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            height: 120,
          }}
        >
          <Typography
            variant="h1"
            fontSize={30}
            marginRight={6}
            display="flex"
            alignItems="center"
          >
            Kenzie Hub
          </Typography>
          <Button
            sx={{
              bgcolor: "#343B41",
              color: "#F8F9FA",
              height: 30,
              marginTop: 5,
            }}
            onClick={logOut}
            component={Link}
            to="/"
          >
            Sair
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            height: 80,
            fontSize: 24,
          }}
        >
          Olá, {userInfo.name}
        </Box>
        <Typography
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            mb: "40px",
          }}
        >
          Tecnologias <AiOutlinePlusSquare onClick={Toggle} size={25} />
        </Typography>
        {isOpen && (
          <Popup
            content={
              <>
                <form onSubmit={addTechs}>
                  Nome
                  <Input
                    placeholder="Material UI"
                    sx={{ input: { color: "#F8F9FA", bgcolor: "#343B41" } }}
                    className="titleInput"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  Selecionar Status
                  <select className="statusInput" onChange={handleStatusChange}>
                    <option value={"Iniciante"}>Iniciante</option>
                    <option value={"Intermediário"}>Intermediário</option>
                    <option value={"Avançado"}>Avançado</option>
                  </select>
                  <Button
                    type="submit"
                    style={{ marginTop: "30px", backgroundColor: "#FF577F" }}
                    variant="contained"
                  >
                    Cadastrar Tecnologia
                  </Button>
                </form>
              </>
            }
            handleClose={Toggle}
          ></Popup>
        )}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          {userTechs &&
            userTechs.map((tech, key) => {
              return (
                <>
                  {isOpenCard && (
                    <Popup
                      content={
                        <>
                          <form onSubmit={changeStatus}>
                            Nome
                            <Input
                              disabled
                              placeholder="Não é possível mudar"
                              sx={{
                                input: { color: "#F8F9FA", bgcolor: "#343B41" },
                                placeholder: { color: "#F8F9FA" },
                              }}
                              className="titleInput"
                              type="text"
                            ></Input>
                            Selecionar Status
                            <select
                              className="statusInput"
                              onChange={handleStatusChange}
                            >
                              <option value={"Iniciante"}>Iniciante</option>
                              <option value={"Intermediário"}>
                                Intermediário
                              </option>
                              <option value={"Avançado"}>Avançado</option>
                            </select>
                            <div>
                              <Button
                                type="submit"
                                style={{
                                  marginTop: "30px",
                                  backgroundColor: "#FF577F",
                                  width: "40%",
                                  marginRight: "25px",
                                }}
                                variant="contained"
                              >
                                Salvar alterações
                              </Button>
                              <Button
                                onClick={deleteStatus}
                                variant="contained"
                                style={{
                                  marginTop: "30px",
                                  backgroundColor: "#868E96",
                                  width: "30%",
                                }}
                              >
                                Excluir
                              </Button>
                            </div>
                          </form>
                        </>
                      }
                      handleClose={toggleCard}
                    ></Popup>
                  )}
                  <Card
                    onClick={(e) => toggleCard(tech.id)}
                    className="statuses"
                    key={key}
                  >
                    <p>{tech.title}</p>
                    <span>{tech.status}</span>
                  </Card>
                </>
              );
            })}
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
