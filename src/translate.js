// 対応表のURLリスト
const table_list = ["../table/markdown.json", "../table/pukiwiki.json"];
let translationTables = new Object();
translationTables["type"] = [];

/**
 * 対応表（jsonファイル）を読み込む関数
 */
const loadJson = async () => {
  for (let table of table_list) {
    fetch(table)
      .then((response) => response.json())
      .then((data) => {
        translationTables["type"].push(data.type);
        translationTables[data.type] = data.notations;
        // console.log(data);
      });
  }
};

/**
 * 入力したテキストを指定した型のフォーマットに変換する
 * @param {string} text 変換するテキスト
 * @param {string} inputType 変換前の記法
 * @param {string} outputType 変換後の記法
 * @return {string} 変換した結果のテキスト
 */
const translate = (text, inputType = "Markdown", outputType = "pukiWiki") => {
  let result = text;
  if (
    !Object.hasOwn(translationTables, inputType) ||
    !Object.hasOwn(translationTables, outputType)
  ) {
    alert("入力形式、もしくは出力形式が見つかりませんでした。");
    return "";
  }

  const inputNotations = translationTables[inputType];
  const outputNotations = translationTables[outputType];

  for (let inputNotation of inputNotations) {
    console.log(inputNotation);

    const index = outputNotations.findIndex(
      (outputNotation) => outputNotation.name === inputNotation.name
    );

    if (index === -1) {
      continue;
    }

    const re = new RegExp(inputNotation["regexp"], "gm");
    console.log(outputNotations[index]);
    result = result.replace(
      re,
      //   `<changed>${outputNotations[index].notation}</changed>`
      outputNotations[index].notation
    );
    // デバッグ用
    // console.log("RegExp: " + re);
    console.log("result: " + result);
  }

  // 変更済みタグを削除
  result = result.replace(/<changed>(.*)<\/changed>/g, "$1");

  return result;
};

(async () => {
  try {
    await loadJson();
  } catch (error) {
    console.error("Error: ", error);
  }
})();
