import React from "react";
import reactLogo from "../assets/logo.svg";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./NameCatPairRate.css";

const NameCatPairRate = ({ userId }) => {
  console.log(userId);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [value, setValue] = React.useState(0);
  const [count, setCount] = React.useState(-1);
  const [name, setName] = React.useState("");
  const [cat, setCat] = React.useState("");
  const [isStarted, setIsStarted] = React.useState(false);

  const handleChange = async (event, newValue) => {
    event.preventDefault();
    let responseData;
    try {
      responseData = await sendRequest(
        // `http://localhost:8010/api/label-train/${userId}`,
        `/api/label-train/${userId}`,
        "POST",
        JSON.stringify({
          nameId: count + 1,
          value: newValue,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}

    setValue(newValue);
    setCount(count + 1);
    setValue(0);
    const nameObj = responseData.nameTrain;
    setName(nameObj.name);
    setCat(nameObj.category);
    console.log(nameObj);
    console.log(newValue);
    console.log(count);
  };

  const startHandler = async (event) => {
    event.preventDefault();
    setIsStarted(true);
    console.log(isStarted);
    let responseData;
    try {
      responseData = await sendRequest(
        // `http://localhost:8010/api/label-train/${userId}`
        `/api/label-train/${userId}`
      );
    } catch (err) {}
    console.log(responseData);
    const nameObj = responseData.nameTrain;
    setCount(Number(nameObj.id) - 1);
    setName(nameObj.name);
    setCat(nameObj.categorry);
    console.log(nameObj);
  };

  let startBox;
  if (!isStarted) {
    startBox = (
      <div className="container">
        <div>
          <header>
            <h1>
              <img width={80} src={reactLogo} alt="react logo" /> Task-1: Name
              Category Pair Rating
            </h1>
            <p>Description.</p>
          </header>
        </div>
        <div className="done">
          <Button onClick={startHandler}>Start labeling!</Button>
        </div>
      </div>
    );
  }

  // const totalCount = 6162;
  const totalCount = 220;
  let box;
  if (count <= totalCount) {
    box = (
      <div className="container">
        <div>
          <header>
            <h1>
              <img width={80} src={reactLogo} alt="react logo" /> Task-1:
              Training Data Labeling
            </h1>
            <p>Name Category Pair Rating.</p>
          </header>
        </div>
        <div className="counter">
          <Typography
            component="legend"
            variant="h6"
            align="center"
            color="primary"
          >
            You have labeled {count} names.
          </Typography>
        </div>
        <div className="box">
          <Box component="fieldset" mb={0} borderColor="transparent" width={1}>
            <Typography component="legend" variant="h6" align="center">
              {name}
            </Typography>
            <Typography component="legend" variant="h6" align="center">
              belongs to the category of
            </Typography>
            <Typography component="legend" variant="h6" align="center">
              {cat} ?
            </Typography>
          </Box>
        </div>
        <div className="rating">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={handleChange}
            size="large"
            align="center"
          />
        </div>
      </div>
    );
  } else {
    box = (
      <div className="container">
        <div>
          <header>
            <h1>
              <img width={80} src={reactLogo} alt="react logo" /> Task-1: Name
              Category Pair Rating
            </h1>
            <p>Description.</p>
          </header>
        </div>
        <div className="done">
          <Typography
            component="legend"
            variant="h4"
            align="center"
            color="primary"
          >
            Congratulations! You finished task 1: labeling {count} names.
          </Typography>
        </div>
      </div>
    );
  }
  if (!isStarted) {
    return <main>{startBox}</main>;
  } else {
    return <main>{box}</main>;
  }
};

export default NameCatPairRate;
