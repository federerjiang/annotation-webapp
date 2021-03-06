import React from "react";
import reactLogo from "../assets/logo.svg";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";

import "./NameCatSelect.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  optgroup: {
    color: "red",
  },
}));

const NameCatSelect = ({ userId }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [value, setValue] = React.useState("Click to select");
  const [count, setCount] = React.useState(-1);
  const [name, setName] = React.useState("");
  const [isStarted, setIsStarted] = React.useState(false);

  const handleChange = async (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    let responseData;
    try {
      responseData = await sendRequest(
        // `http://localhost:8010/api/label-eval/${userId}`,
        `/api/label-eval/${userId}`,
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
    const nameObj = responseData.name;
    setName(nameObj.name);
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
        // `http://localhost:8010/api/label-eval/${userId}`
        `/api/label-eval/${userId}`
      );
    } catch (err) {}
    const nameObj = responseData.nameEval;
    setCount(Number(nameObj.id) - 1);
    setName(nameObj.name);
    console.log(nameObj);
  };

  let startBox;
  if (!isStarted) {
    startBox = (
      <div className="container">
        <div>
          <header>
            <h1>
              <img width={80} src={reactLogo} alt="react logo" /> Task-2:
              Evaluation Data Labeling
            </h1>
            <p>Name Category Selection.</p>
          </header>
        </div>
        <div className="done">
          <Button onClick={startHandler}>Start labeling!</Button>
        </div>
      </div>
    );
  }

  const totalCount = 2000;
  let box;

  const classes = useStyles();

  const form1 = (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="grouped-select">Click to select</InputLabel>
      <Select
        native
        defaultValue=""
        id="grouped-native-select"
        onChange={handleChange}
        value={value}
      >
        <option aria-label="None" value="" />
        <optgroup label="??????">
          <option value={"?????? | ????????????"}>????????????</option>
          <option value={"?????? | ????????????"}>????????????</option>
          <option value={"?????? | ??????????????????????????????"}>
            ??????????????????????????????
          </option>
          <option value={"?????? | ????????????"}>????????????</option>
          <option value={"?????? | ??????????????????"}>??????????????????</option>
          <option value={"?????? | ???????????????"}>???????????????</option>
          <option value={"?????? | ????????????????????????"}>?????????</option>
          <option value={"??????"}>Confused</option>
        </optgroup>
        <optgroup label="???????????????">
          <option value={"??????????????? | nanaco"}>nanaco</option>
          <option value={"??????????????? | suica"}>suica</option>
          <option value={"??????????????? | Edy"}>Edy</option>
          <option value={"??????????????? | ????????????????????????"}>?????????</option>
          <option value={"???????????????"}>Confused</option>
        </optgroup>
        <optgroup label="????????????">
          <option value={"???????????? | Amazon"}>Amazon</option>
          <option value={"???????????? | yahoo"}>yahoo</option>
          <option value={"???????????? | ????????????????????????"}>?????????</option>
          <option value={"????????????"}>Confused</option>
        </optgroup>
        <optgroup label="??????">
          <option value={"?????? | ??????"}>??????</option>
          <option value={"?????? | ?????????"}>?????????</option>
          <option value={"?????? | ???????????????"}>???????????????</option>
          <option value={"?????? | ??????"}>??????</option>
          <option value={"?????? | ????????????"}>????????????</option>
          <option value={"?????? | ????????????????????????"}>?????????</option>
          <option value={"??????"}>Confused</option>
        </optgroup>
        <optgroup label="??????">
          <option value={"?????? | ????????????"}>????????????</option>
          <option value={"?????? | ????????????"}>????????????</option>
          <option value={"?????? | ????????????????????????"}>?????????</option>
          <option value={"??????"}>Confused</option>
        </optgroup>
        <optgroup label="???????????????">
          <option value={"??????????????? | ??????????????????"}>??????????????????</option>
          <option value={"??????????????? | ?????????"}>?????????</option>
          <option value={"??????????????? | ?????????"}>?????????</option>
          <option value={"??????????????? | ????????????????????????"}>?????????</option>
          <option value={"???????????????"}>Confused</option>
        </optgroup>
        <optgroup label="????????????????????????">
          <option value={"???????????????????????? | ?????????????????????"}>
            ?????????????????????
          </option>
          <option value={"???????????????????????? | ??????????????????????????????"}>
            ??????????????????????????????
          </option>
          <option value={"???????????????????????? | ????????????"}>????????????</option>
          <option value={"???????????????????????? | ?????????????????????"}>
            ?????????????????????
          </option>
          <option value={"???????????????????????? | ????????????"}>????????????</option>
          <option value={"???????????????????????? | ????????????????????????"}>?????????</option>
          <option value={"????????????????????????"}>Confused</option>
        </optgroup>
        <optgroup label="??????????????????">
          <option value={"?????????????????? | ????????????????????????"}>
            ????????????????????????
          </option>
          <option value={"?????????????????? | ??????????????????????????????????????????"}>
            ??????????????????????????????????????????
          </option>
          <option value={"?????????????????? | ????????????????????????????????????"}>
            ????????????????????????????????????
          </option>
          <option value={"?????????????????? | ???"}>???</option>
          <option value={"?????????????????? | ???????????????????????????"}>
            ???????????????????????????
          </option>
          <option value={"?????????????????? | ????????????????????????"}>
            ????????????????????????
          </option>
          <option value={"?????????????????? | ????????????????????????"}>?????????</option>
          <option value={"??????????????????"}>Confused</option>
        </optgroup>
        <optgroup label="????????????">
          <option value={"???????????? | ????????????????????????????????????"}>
            ????????????????????????????????????
          </option>
          <option value={"???????????? | ??????????????????????????????"}>
            ??????????????????????????????
          </option>
          <option value={"???????????? | ??????????????????????????????"}>
            ??????????????????????????????
          </option>
          <option value={"???????????? | ????????????????????????"}>?????????</option>
          <option value={"????????????"}>Confused</option>
        </optgroup>
        <optgroup label="???????????????">
          <option value={"??????????????? | ?????????????????????????????????"}>
            ?????????????????????????????????
          </option>
          <option value={"??????????????? | ???????????????????????????"}>
            ???????????????????????????
          </option>
          <option value={"??????????????? | ???????????????????????????"}>
            ???????????????????????????
          </option>
          <option value={"??????????????? | ??????????????????????????????"}>
            ??????????????????????????????
          </option>
          <option value={"??????????????? | ??????????????????"}>??????????????????</option>
          <option value={"??????????????? | ?????????"}>?????????</option>
          <option value={"??????????????? | CD???DVD?????????"}>CD???DVD?????????</option>
          <option value={"??????????????? | ???"}>???</option>
          <option value={"??????????????? | ???????????????"}>???????????????</option>
          <option value={"??????????????? | ??????"}>??????</option>
          <option value={"??????????????? | ????????????"}>????????????</option>
          <option value={"??????????????? | ?????????????????????"}>?????????</option>
          <option value={"???????????????"}>Confused</option>
        </optgroup>
        <optgroup label="?????????">
          <option value={"????????? | ?????????????????????????????????"}>
            ?????????????????????????????????
          </option>
          <option value={"????????? | ????????????????????????"}>?????????</option>
          <option value={"?????????"}>Confused</option>
        </optgroup>
        <optgroup label="?????????">
          <option value={"????????? | ???????????????"}>???????????????</option>
          <option value={"????????? | ???????????????????????????"}>
            ???????????????????????????
          </option>
          <option value={"????????? | ????????????"}>????????????</option>
          <option value={"????????? | ?????????"}>?????????</option>
          <option value={"????????? | ????????????????????????"}>?????????</option>
          <option value={"?????????"}>Confused</option>
        </optgroup>
        <optgroup label="???????????????">
          <option value={"??????????????? | ????????????????????????"}>
            ????????????????????????
          </option>
          <option value={"??????????????? | ????????????????????????TV????????????"}>
            ????????????????????????TV????????????
          </option>
          <option value={"??????????????? | ????????????????????????"}>?????????</option>
          <option value={"???????????????"}>Confused</option>
        </optgroup>
        <optgroup label="???????????????">
          <option value={"??????????????? | ???????????????????????????"}>
            ???????????????????????????
          </option>
          <option value={"??????????????? | ??????"}>??????</option>
          <option value={"??????????????? | ????????????????????????"}>?????????</option>
          <option value={"??????????????? "}>Confused</option>
        </optgroup>
        <optgroup label="???????????????????????????????????????">
          <option value={"??????????????????????????????????????? | ???????????????????????????"}>
            ???????????????????????????
          </option>
          <option value={"??????????????????????????????????????? | ?????????"}>?????????</option>
          <option value={"???????????????????????????????????????"}>Confused</option>
        </optgroup>
        <optgroup label="???????????????????????????????????????">
          <option value={"??????????????????????????????????????? | ???????????????????????? "}>
            ?????????
          </option>
          <option value={"???????????????????????????????????????"}>Confused</option>
        </optgroup>
        <optgroup label="???????????????">
          <option value={"??????????????? | ?????????"}>?????????</option>
          <option value={"??????????????? | ???????????????????????????"}>
            ???????????????????????????
          </option>
          <option value={"??????????????? | ????????????"}>????????????</option>
          <option value={"??????????????? | ??????????????????????????????"}>
            ??????????????????????????????
          </option>
          <option value={"??????????????? | ?????????"}>?????????</option>
          <option value={"??????????????? | ?????????"}>?????????</option>
          <option value={"??????????????? | ???????????????"}>???????????????</option>
          <option value={"??????????????? | ????????????????????????"}>?????????</option>
          <option value={"???????????????"}>Confused</option>
        </optgroup>
        <optgroup label="?????????">
          <option value={"????????? | ???????????????"}>???????????????</option>
          <option value={"????????? | ?????????"}>?????????</option>
          <option value={"????????? | ???????????????"}>???????????????</option>
          <option value={"????????? | ?????????????????????"}>?????????????????????</option>
          <option value={"????????? | ?????????/?????????????????????/??????"}>
            ?????????/?????????????????????/??????
          </option>
          <option value={"????????? | ????????????????????????"}>?????????</option>
          <option value={"?????????"}>Confused</option>
        </optgroup>
        <optgroup label="??????">
          <option value={"?????? | ?????????"}>?????????</option>
          <option value={"?????? | ????????????????????????"}>????????????????????????</option>
          <option value={"?????? | ????????????????????????"}>?????????</option>
          <option value={"??????"}>Confused</option>
        </optgroup>
        <optgroup label="?????????????????????">
          <option value={"????????????????????? | ????????????????????????"}>?????????</option>
        </optgroup>
        <optgroup label="???????????????????????????">
          <option value={"??????????????????????????? | ????????????????????????"}>
            ?????????
          </option>
        </optgroup>
        <optgroup label="?????????">
          <option value={"???????????????????????? | ????????????????????????"}>?????????</option>
        </optgroup>
      </Select>
      <FormHelperText>Select Confused if not sure.</FormHelperText>
    </FormControl>
  );

  if (count <= totalCount) {
    box = (
      <div className="container">
        <div>
          <header>
            <h1>
              <img width={80} src={reactLogo} alt="react logo" /> Task-2:
              Evaluation Data Labeling
            </h1>
            <p>Name Category Selection.</p>
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
        <div className="selectbox">
          <div className="box">
            <Box
              component="fieldset"
              mb={0}
              borderColor="transparent"
              width={1}
            >
              <Typography component="legend" variant="h6" align="center">
                {name}
              </Typography>
              <Typography component="legend" variant="h6" align="center">
                belongs to the category of
              </Typography>
            </Box>
          </div>
          <div className="select">{form1}</div>
        </div>
      </div>
    );
  } else {
    box = (
      <div className="container">
        <div>
          <header>
            <h1>
              <img width={80} src={reactLogo} alt="react logo" /> Task-2:
              Evaluation Data Labeling
            </h1>
            <p>Name Category Selection.</p>
          </header>
        </div>
        <div className="done">
          <Typography
            component="legend"
            variant="h4"
            align="center"
            color="primary"
          >
            Congratulations! You finished task 2: labeling {count} names.
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

export default NameCatSelect;
