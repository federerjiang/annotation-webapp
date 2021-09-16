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
        <optgroup label="通信">
          <option value={"通信 | 携帯電話"}>携帯電話</option>
          <option value={"通信 | 固定電話"}>固定電話</option>
          <option value={"通信 | インターネット関連費"}>
            インターネット関連費
          </option>
          <option value={"通信 | 決済代行"}>決済代行</option>
          <option value={"通信 | 郵便・宅配便"}>郵便・宅配便</option>
          <option value={"通信 | 放送視聴料"}>放送視聴料</option>
          <option value={"通信 | 未設定（その他）"}>未設定</option>
          <option value={"通信"}>Confused</option>
        </optgroup>
        <optgroup label="電子マネー">
          <option value={"電子マネー | nanaco"}>nanaco</option>
          <option value={"電子マネー | suica"}>suica</option>
          <option value={"電子マネー | Edy"}>Edy</option>
          <option value={"電子マネー | 未設定（その他）"}>未設定</option>
          <option value={"電子マネー"}>Confused</option>
        </optgroup>
        <optgroup label="総合通販">
          <option value={"総合通販 | Amazon"}>Amazon</option>
          <option value={"総合通販 | yahoo"}>yahoo</option>
          <option value={"総合通販 | 未設定（その他）"}>未設定</option>
          <option value={"総合通販"}>Confused</option>
        </optgroup>
        <optgroup label="交通">
          <option value={"交通 | 電車"}>電車</option>
          <option value={"交通 | 飛行機"}>飛行機</option>
          <option value={"交通 | レンタカー"}>レンタカー</option>
          <option value={"交通 | バス"}>バス</option>
          <option value={"交通 | タクシー"}>タクシー</option>
          <option value={"交通 | 未設定（その他）"}>未設定</option>
          <option value={"交通"}>Confused</option>
        </optgroup>
        <optgroup label="保険">
          <option value={"保険 | 生命保険"}>生命保険</option>
          <option value={"保険 | 損害保険"}>損害保険</option>
          <option value={"保険 | 未設定（その他）"}>未設定</option>
          <option value={"保険"}>Confused</option>
        </optgroup>
        <optgroup label="水道・光熱">
          <option value={"水道・光熱 | ガス・灯油代"}>ガス・灯油代</option>
          <option value={"水道・光熱 | 水道代"}>水道代</option>
          <option value={"水道・光熱 | 電気代"}>電気代</option>
          <option value={"水道・光熱 | 未設定（その他）"}>未設定</option>
          <option value={"水道・光熱"}>Confused</option>
        </optgroup>
        <optgroup label="日用品（専門店）">
          <option value={"日用品（専門店） | ホームセンター"}>
            ホームセンター
          </option>
          <option value={"日用品（専門店） | コンビニエンスストア"}>
            コンビニエンスストア
          </option>
          <option value={"日用品（専門店） | スーパー"}>スーパー</option>
          <option value={"日用品（専門店） | ドラッグストア"}>
            ドラッグストア
          </option>
          <option value={"日用品（専門店） | 定期購買"}>定期購買</option>
          <option value={"日用品（専門店） | 未設定（その他）"}>未設定</option>
          <option value={"日用品（専門店）"}>Confused</option>
        </optgroup>
        <optgroup label="ファッション">
          <option value={"ファッション | ファストブランド"}>
            ファストブランド
          </option>
          <option value={"ファッション | インナー・下着・ナイトウエア"}>
            インナー・下着・ナイトウエア
          </option>
          <option value={"ファッション | ジュエリー・アクセサリー"}>
            ジュエリー・アクセサリー
          </option>
          <option value={"ファッション | 靴"}>靴</option>
          <option value={"ファッション | ハイエンドブランド"}>
            ハイエンドブランド
          </option>
          <option value={"ファッション | セレクトショップ"}>
            セレクトショップ
          </option>
          <option value={"ファッション | 未設定（その他）"}>未設定</option>
          <option value={"ファッション"}>Confused</option>
        </optgroup>
        <optgroup label="トラベル">
          <option value={"トラベル | 旅館・ホテル（宿泊施設）"}>
            旅館・ホテル（宿泊施設）
          </option>
          <option value={"トラベル | 楽天トラベル（国内）"}>
            楽天トラベル（国内）
          </option>
          <option value={"トラベル | 楽天トラベル（海外）"}>
            楽天トラベル（海外）
          </option>
          <option value={"トラベル | 未設定（その他）"}>未設定</option>
          <option value={"トラベル"}>Confused</option>
        </optgroup>
        <optgroup label="趣味・娯楽">
          <option value={"趣味・娯楽 | レジャー・テーマパーク"}>
            レジャー・テーマパーク
          </option>
          <option value={"趣味・娯楽 | その他興行チケット"}>
            その他興行チケット
          </option>
          <option value={"趣味・娯楽 | デジタルコンテンツ"}>
            デジタルコンテンツ
          </option>
          <option value={"趣味・娯楽 | スポーツ・アウトドア"}>
            スポーツ・アウトドア
          </option>
          <option value={"趣味・娯楽 | ソフトウェア"}>ソフトウェア</option>
          <option value={"趣味・娯楽 | ゴルフ"}>ゴルフ</option>
          <option value={"趣味・娯楽 | CD・DVD・楽器"}>CD・DVD・楽器</option>
          <option value={"趣味・娯楽 | 本"}>本</option>
          <option value={"趣味・娯楽 | 印刷・写真"}>印刷・写真</option>
          <option value={"趣味・娯楽 | 映画"}>映画</option>
          <option value={"趣味・娯楽 | 娯楽施設"}>娯楽施設</option>
          <option value={"趣味・娯楽 | 未設定（その他"}>未設定</option>
          <option value={"趣味・娯楽"}>Confused</option>
        </optgroup>
        <optgroup label="住まい">
          <option value={"住まい | 家賃（管理費・積立金）"}>
            家賃（管理費・積立金）
          </option>
          <option value={"住まい | 未設定（その他）"}>未設定</option>
          <option value={"住まい"}>Confused</option>
        </optgroup>
        <optgroup label="自動車">
          <option value={"自動車 | ガソリン代"}>ガソリン代</option>
          <option value={"自動車 | 車用品・バイク用品"}>
            車用品・バイク用品
          </option>
          <option value={"自動車 | 道路料金"}>道路料金</option>
          <option value={"自動車 | 駐車場"}>駐車場</option>
          <option value={"自動車 | 未設定（その他）"}>未設定</option>
          <option value={"自動車"}>Confused</option>
        </optgroup>
        <optgroup label="家具・家電">
          <option value={"家具・家電 | インテリア・寝具"}>
            インテリア・寝具
          </option>
          <option value={"家具・家電 | 家電・パソコン・TV・カメラ"}>
            家電・パソコン・TV・カメラ
          </option>
          <option value={"家具・家電 | 未設定（その他）"}>未設定</option>
          <option value={"家具・家電"}>Confused</option>
        </optgroup>
        <optgroup label="教育・教養">
          <option value={"教育・教養 | 教育費（学費、塾）"}>
            教育費（学費、塾）
          </option>
          <option value={"教育・教養 | 新聞"}>新聞</option>
          <option value={"教育・教養 | 未設定（その他）"}>未設定</option>
          <option value={"教育・教養 "}>Confused</option>
        </optgroup>
        <optgroup label="百貨店・ショッピングモール">
          <option value={"百貨店・ショッピングモール | ショッピングモール"}>
            ショッピングモール
          </option>
          <option value={"百貨店・ショッピングモール | 百貨店"}>百貨店</option>
          <option value={"百貨店・ショッピングモール"}>Confused</option>
        </optgroup>
        <optgroup label="キッズ・ベビー・マタニティ">
          <option value={"キッズ・ベビー・マタニティ | 未設定（その他） "}>
            未設定
          </option>
          <option value={"キッズ・ベビー・マタニティ"}>Confused</option>
        </optgroup>
        <optgroup label="美容・健康">
          <option value={"美容・健康 | 化粧品"}>化粧品</option>
          <option value={"美容・健康 | フィットネス・ジム"}>
            フィットネス・ジム
          </option>
          <option value={"美容・健康 | 健康食品"}>健康食品</option>
          <option value={"美容・健康 | ネイルサロン・まつ毛"}>
            ネイルサロン・まつ毛
          </option>
          <option value={"美容・健康 | 美容院"}>美容院</option>
          <option value={"美容・健康 | エステ"}>エステ</option>
          <option value={"美容・健康 | マッサージ"}>マッサージ</option>
          <option value={"美容・健康 | 未設定（その他）"}>未設定</option>
          <option value={"美容・健康"}>Confused</option>
        </optgroup>
        <optgroup label="飲食店">
          <option value={"飲食店 | レストラン"}>レストラン</option>
          <option value={"飲食店 | カフェ"}>カフェ</option>
          <option value={"飲食店 | ファミレス"}>ファミレス</option>
          <option value={"飲食店 | ファストフード"}>ファストフード</option>
          <option value={"飲食店 | 居酒屋/ダイニングバー/バル"}>
            居酒屋/ダイニングバー/バル
          </option>
          <option value={"飲食店 | 未設定（その他）"}>未設定</option>
          <option value={"飲食店"}>Confused</option>
        </optgroup>
        <optgroup label="医療">
          <option value={"医療 | 医療費"}>医療費</option>
          <option value={"医療 | 眼鏡・コンタクト"}>眼鏡・コンタクト</option>
          <option value={"医療 | 未設定（その他）"}>未設定</option>
          <option value={"医療"}>Confused</option>
        </optgroup>
        <optgroup label="社会保障・税金">
          <option value={"社会保障・税金 | 未設定（その他）"}>未設定</option>
        </optgroup>
        <optgroup label="ペット・ペット用品">
          <option value={"ペット・ペット用品 | 未設定（その他）"}>
            未設定
          </option>
        </optgroup>
        <optgroup label="未設定">
          <option value={"未設定（その他） | 未設定（その他）"}>未設定</option>
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
