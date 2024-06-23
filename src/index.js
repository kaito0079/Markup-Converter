/**
 * 変換できる入力と出力を選択肢に追加
 */
const addOption = () => {};

// TODO: クリップボードにコピー

// テーブルのリストを取得
const markupList = translationTables["type"];

// DOMの読み取り
const inputType = document.getElementById("inputType");
const outputType = document.getElementById("outputType");
const inputTextArea = document.getElementById("inputText");
const outputTextArea = document.getElementById("outputText");

/**
 * 選択されている入力・出力のタイプとテキストから変換後のテキストを作成する
 */
const valueChangeHandle = () => {
  const inputText = inputTextArea.value;
  let outputText = "";
  console.log("inputType: ", inputType.value);
  console.log("outputType: ", outputType.value);
  if (inputType.value != "" && outputType.value != "") {
    outputText = translate(inputText, inputType.value, outputType.value);
  } else {
    outputText = translate(inputText);
  }

  outputTextArea.value = outputText;
};

// 選択肢の登録
for (let markup of markupList) {
  const option = document.createElement("option");
  option.text = markup;
  option.value = markup;
  inputType.appendChild(option);
  outputType.appendChild(option);
}

// イベントの登録
inputType.addEventListener("change", valueChangeHandle);
outputType.addEventListener("change", valueChangeHandle);
inputTextArea.addEventListener("change", valueChangeHandle);
